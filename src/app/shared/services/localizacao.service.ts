import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoPaisRequestDTO, LocalizacaoDTO } from '../model/localizacao.model';
import { APIConfig } from '../../config/api.config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalizacaoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'localizacaos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<LocalizacaoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<LocalizacaoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(Localizacao: LocalizacaoDTO): Promise<LocalizacaoDTO> {
    return await this.http.post<any>(this.URL, Localizacao)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(Localizacao: LocalizacaoDTO): Promise<LocalizacaoDTO[]> {
    return await this.http.put<any>(this.URL + "/" + Localizacao.id, Localizacao)
      .toPromise()
      .then(data => { return data; });
  }


  public async listAllByPaisEstado(dto : EstadoPaisRequestDTO): Promise<LocalizacaoDTO[]> {

     let  urlPrepared = this.URL + "/locais?estado=" + dto.estado + 
        "&pais=" + dto.pais;
    return await this.http.get<any>(urlPrepared)
      .toPromise()
      .then(data => { return data; });
  }
/*
  public async listEstadosByPais(pais : String): Promise<string[]> {

     let  urlPrepared = this.URL + "/estados/" + pais ;
    return await this.http.get<any>(urlPrepared)
      .toPromise()
      .then(data => { return data; });
  }
      */

  public listEstadosByPais(pais: string): Observable<string[]> {
  const urlPrepared = `${this.URL}/estados/${pais}`;
  return this.http.get<string[]>(urlPrepared);
}
}
