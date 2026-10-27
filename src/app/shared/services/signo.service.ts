import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignoByDiaMesDTO, SignoDTO } from '../model/signo.model';
import { APIConfig } from '../../config/api.config';

@Injectable({ providedIn: 'root' })
export class SignoService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'signos';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;

  public async listAll(): Promise<SignoDTO[]> {
    return await this.http.get<any>(this.URL)
      .toPromise()
      .then(data => { return data; });
  }

  public async delete(id: number): Promise<SignoDTO[]> {
    return await this.http.delete<any>(this.URL + "/" + id)
      .toPromise()
      .then(data => { return data; });
  }

  public async create(signo: SignoDTO): Promise<SignoDTO> {
    return await this.http.post<any>(this.URL, signo)
      .toPromise()
      .then(data => { return data; });
  }

  public async update(signo: SignoDTO): Promise<SignoDTO> {
    return await this.http.put<any>(this.URL + "/" + signo.id, signo)
      .toPromise()
      .then(data => { return data; });
  }

   public async buscaSigno(dto: SignoByDiaMesDTO): Promise<SignoDTO> {
    let  urlPrepared = this.URL + "/diames/?dia=" +
      dto.diaNascimento + 
        "&mes=" + dto.mesNascimento;
    
    return await this.http.get<any>(urlPrepared)
      .toPromise()
      .then(data => { return data; });
  }
}
