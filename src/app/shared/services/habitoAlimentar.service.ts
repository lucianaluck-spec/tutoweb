import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HabitoAlimentarDTO } from '../model/habitoAlimentar.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class HabitoAlimentarService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'habitoAlimentars';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<HabitoAlimentarDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<HabitoAlimentarDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(habitoalimentar: HabitoAlimentarDTO): Promise<HabitoAlimentarDTO[]> {
    return await this.http.post<any>(this.URL, habitoalimentar)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(habitoalimentar: HabitoAlimentarDTO): Promise<HabitoAlimentarDTO[]> {
    return await this.http.put<any>(this.URL + "/" + habitoalimentar.id, habitoalimentar)
      .toPromise()
      .then(data => { return data; });
  }
}
