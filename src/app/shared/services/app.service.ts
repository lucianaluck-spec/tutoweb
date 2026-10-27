import { APIConfig } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { AuthenticatedUser, AuthenticateRequestDTO, RenewTokenRequestDTO, 
       TokenResponseDTO } from '../model/security.model';
import { from } from 'rxjs';
import { IntegranteDTO } from '../model/integrante.model ';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private router: Router, private http: HttpClient) { }

    private readonly ENDPOINT_AUTH: string = 'security/authenticate';
    private readonly ENDPOINT_RENEW: string = 'security/token/renew';
    private readonly ENDPOINT_INTEGRANTE: string = 'integrantes/';
    private readonly ONE_SECOND = 1000; // 1 segundo
    private readonly RENEW_THRESHOLD = 60000; // 60 segundos
    private user: AuthenticatedUser | null = null;
    private integrante: IntegranteDTO | null = null;
    
    private buildURL(uri: string): string {
        return APIConfig.CADASTROS_API_URL
            + "/"
            + APIConfig.CADASTROS_API_VERSION
            + "/"
            + uri;
    }

    private decodeToken(token: string): AuthenticatedUser | null{
        try {
            const decoded = jwtDecode(token);
            if (decoded) {
                const username: string = decoded.sub!;
                const issued: Date = new Date(decoded.iat! * this.ONE_SECOND);
                const expires: Date = new Date(decoded.exp! * this.ONE_SECOND);
                return new AuthenticatedUser(username, issued, expires, token)
            }
            return null;
        } catch (error) {
            console.error("Erro ao decodificar o token JWT", error);
            return null;
        }
    }

    private setAuthenticatedUser(tokenResponse: TokenResponseDTO, integrante: IntegranteDTO) {
    try {
        var tokenAux = tokenResponse!.token!.toString();
        const authenticatedUser = this.decodeToken(tokenAux);
        if (authenticatedUser) {
            this.user = authenticatedUser;

            // O String(...) converte o objeto String em string primitiva
            // O ?? '' garante que se for undefined, assumirá uma string vazia
            this.user.picture = String(integrante.fotoString ?? '');
            this.user.nome = String(integrante.nomeAtual ?? '');
            this.user.createdAt = integrante.dataCadastro;
            this.user.idIntegrante = integrante.id;
            
            this.user.supervisao = false;
        } else {
            this.logout();
        }
    } catch (error) {
        this.logout();
        throw error;
    }
}
    private shouldRenewToken(): boolean {
        if (this.isAuthenticated() && this.user!.expiration) {
            const diff = this.user!.expiration.getTime() - new Date().getTime();
            return diff < this.RENEW_THRESHOLD;
        }
        return false;
    }

    public renewTokenIfNeeded() {
        if (this.shouldRenewToken()) {
            console.info("Renovando access token...");
            const request = new RenewTokenRequestDTO(this.user!.token);
            this.callRenewToken(request).then(
                response => {
                    this.setAuthenticatedUser(response, this.integrante!);
                },
                error => {
                    console.error('Erro ao renovar o token', error);
                    this.logout();
                }
            );
        }
    }

    private async callAuthenticate(request: AuthenticateRequestDTO): Promise<TokenResponseDTO> {
        return await this.http.post<any>(this.buildURL(this.ENDPOINT_AUTH), request)
            .toPromise()
            .then(data => { return data; });
    }

    private async callRenewToken(request: RenewTokenRequestDTO): Promise<TokenResponseDTO> {
        return this.http.post<any>(this.buildURL(this.ENDPOINT_RENEW), request)
            .toPromise()
            .then(data => { return data; });
    }

    public getAuthenticatedUser(): AuthenticatedUser | null {
        return this.user;
    }

    public isAuthenticated(): boolean {
        return !!this.user;
    }

    public async login({ email, password } : { email: string , password: string }): Promise<boolean> {
        try {
            const request = new AuthenticateRequestDTO(email, password);
            const response = await this.callAuthenticate(request);
            this.integrante = await this.getByIntegranteIDUsuario(response.idUsuario!);
            if  (this.integrante === null) {
                this.logout();
                return false;
            } else {
                this.setAuthenticatedUser(response, this.integrante);
                return true;
            }

        } catch (error) {
            this.logout();
            return false;
        }
    }

    public async getByIntegranteIDUsuario(idUsuario: number): Promise<IntegranteDTO> {
        return await this.http.get<any>(this.buildURL(this.ENDPOINT_INTEGRANTE) + "usuario/" + idUsuario)
            .toPromise()
            .then(data => { return data; });
    }


    public logout() {
        this.user = null;
        this.router.navigate(['/login']);
    }

  public async updatePaswword(request: AuthenticateRequestDTO): Promise<void> {
    return await this.http.put<any>(this.buildURL(this.ENDPOINT_INTEGRANTE) + "updatepassword", request)
      .toPromise()
      .then(data => { return data; });
  }
}
