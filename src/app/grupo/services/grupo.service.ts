import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrupoDTO, GrupoImagemDTO } from '../../shared/model/grupo.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class GrupoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'grupos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<GrupoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<GrupoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(profissao: GrupoDTO): Promise<GrupoDTO[]> {
    return await this.http.post<any>(this.URL, profissao)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(admCartao: GrupoDTO): Promise<GrupoDTO[]> {
    return await this.http.put<any>(this.URL + "/" + admCartao.id, admCartao)
      .toPromise()
      .then(data => { return data; });
  }

  public async getByID(idGrupo: number): Promise<GrupoDTO> {
    return await this.http.get<any>(this.URL+ "/" + idGrupo)
      .toPromise()
      .then(data => { return data; });
  }


  public async getByGeracao(geracao: number): Promise<GrupoDTO> {
    return await this.http.get<any>(this.URL+ "/geracao/" + geracao)
      .toPromise()
      .then(data => { return data; });
  }


  public async addImagem(item: GrupoImagemDTO): Promise<GrupoDTO> {
    return await this.http.put<any>(this.URL, item)
      .toPromise()
      .then(data => { return data; });
  }  

  public async deleteImagem(item: GrupoImagemDTO): Promise<GrupoDTO> {
    return await this.http.put<any>(this.URL + "/delete-imagem", item)
      .toPromise()
      .then(data => { return data; });
  }  
}
