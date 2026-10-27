import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HabilitacaoDTO } from '../model/habilitacao.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class HabilitacaoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'habilitacaos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<HabilitacaoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<HabilitacaoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(habilitacao: HabilitacaoDTO): Promise<HabilitacaoDTO[]> {
    return await this.http.post<any>(this.URL, habilitacao)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(habilitacao: HabilitacaoDTO): Promise<HabilitacaoDTO[]> {
    return await this.http.put<any>(this.URL + "/" + habilitacao.id, habilitacao)
      .toPromise()
      .then(data => { return data; });
  }
}
