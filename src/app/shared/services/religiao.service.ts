import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReligiaoDTO } from '../model/religiao.model copy';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class ReligiaoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'religiaos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<ReligiaoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<ReligiaoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(religiao: ReligiaoDTO): Promise<ReligiaoDTO[]> {
    return await this.http.post<any>(this.URL, religiao)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(religiao: ReligiaoDTO): Promise<ReligiaoDTO[]> {
    return await this.http.put<any>(this.URL + "/" + religiao.id, religiao)
      .toPromise()
      .then(data => { return data; });
  }
}
