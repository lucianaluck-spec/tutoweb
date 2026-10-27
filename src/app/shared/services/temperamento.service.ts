import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemperamentoDTO } from '../model/temperamento.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class TemperamentoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'temperamentos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<TemperamentoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<TemperamentoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(temperamento: TemperamentoDTO): Promise<TemperamentoDTO[]> {
    return await this.http.post<any>(this.URL, temperamento)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(temperamento: TemperamentoDTO): Promise<TemperamentoDTO[]> {
    return await this.http.put<any>(this.URL + "/" + temperamento.id, temperamento)
      .toPromise()
      .then(data => { return data; });
  }
}
