import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusDTO } from '../model/integrante.model ';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class StatusService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'status';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<StatusDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }


  public async update(status: StatusDTO): Promise<StatusDTO[]> {
    return await this.http.put<any>(this.URL + "/" + status.id, status)
      .toPromise()
      .then(data => { return data; });
  }
}
