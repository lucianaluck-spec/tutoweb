import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeFutebolDTO } from '../model/timeFutebol.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class TimeFutebolService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'times';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<TimeFutebolDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<TimeFutebolDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(time: TimeFutebolDTO): Promise<TimeFutebolDTO[]> {
    return await this.http.post<any>(this.URL, time)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(time: TimeFutebolDTO): Promise<TimeFutebolDTO[]> {
    return await this.http.put<any>(this.URL + "/" + time.id, time)
      .toPromise()
      .then(data => { return data; });
  }
}
