import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IntroducaoDTO } from '../model/introducao.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class IntroducaoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'introducaos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<IntroducaoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<IntroducaoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(introducao: IntroducaoDTO): Promise<IntroducaoDTO[]> {
    return await this.http.post<any>(this.URL, introducao)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(introducao: IntroducaoDTO): Promise<IntroducaoDTO[]> {
    return await this.http.put<any>(this.URL + "/" + introducao.id, introducao)
      .toPromise()
      .then(data => { return data; });
  }


    public async getByTema(tema: string): Promise<IntroducaoDTO> {
      return await this.http.get<any>(this.URL + "/tema/" + tema)
        .toPromise()
        .then(data => { return data; });
    }
}
