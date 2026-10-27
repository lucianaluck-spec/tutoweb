import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstiloMusicalDTO } from '../model/estiloMusical.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class EstiloMusicalService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'estiloMusicals';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<EstiloMusicalDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<EstiloMusicalDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(estiloMusical: EstiloMusicalDTO): Promise<EstiloMusicalDTO[]> {
    return await this.http.post<any>(this.URL, estiloMusical)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(estiloMusical: EstiloMusicalDTO): Promise<EstiloMusicalDTO[]> {
    return await this.http.put<any>(this.URL + "/" + estiloMusical.id, estiloMusical)
      .toPromise()
      .then(data => { return data; });
  }
}
