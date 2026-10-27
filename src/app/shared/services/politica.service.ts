import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoliticaDTO } from '../model/politica.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class PoliticaService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'politicas';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<PoliticaDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<PoliticaDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(politica: PoliticaDTO): Promise<PoliticaDTO[]> {
    return await this.http.post<any>(this.URL, politica)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(politica: PoliticaDTO): Promise<PoliticaDTO[]> {
    return await this.http.put<any>(this.URL + "/" + politica.id, politica)
      .toPromise()
      .then(data => { return data; });
  }
}
