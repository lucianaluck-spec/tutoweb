import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfissaoDTO } from '../model/profissao.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class ProfissaoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'profissaos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<ProfissaoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<ProfissaoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(profissao: ProfissaoDTO): Promise<ProfissaoDTO[]> {
    return await this.http.post<any>(this.URL, profissao)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(admCartao: ProfissaoDTO): Promise<ProfissaoDTO[]> {
    return await this.http.put<any>(this.URL + "/" + admCartao.id, admCartao)
      .toPromise()
      .then(data => { return data; });
  }
}
