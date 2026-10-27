import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParametroDTO } from '../model/parametro.model copy';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class ParametroService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'parametros';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async update(par: ParametroDTO): Promise<ParametroDTO[]> {
    return await this.http.put<any>(this.URL, par)
      .toPromise()
      .then(data => { return data; });
  }

  public async find(): Promise<ParametroDTO> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }
}
