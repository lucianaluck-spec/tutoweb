import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoSanguineoDTO } from '../model/tipoSanguineo.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class TipoSanguineoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'sanguineos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<TipoSanguineoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<TipoSanguineoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(TipoSanguineo: TipoSanguineoDTO): Promise<TipoSanguineoDTO[]> {
    return await this.http.post<any>(this.URL, TipoSanguineo)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(TipoSanguineo: TipoSanguineoDTO): Promise<TipoSanguineoDTO[]> {
    return await this.http.put<any>(this.URL + "/" + TipoSanguineo.id, TipoSanguineo)
      .toPromise()
      .then(data => { return data; });
  }
}
