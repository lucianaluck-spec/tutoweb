import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AniversariantesDTO, ConsultarImagemIntegranteRequestDTO, ConsultarIntegranteRequestDTO, ConsultarIntegranteResponseDTO, IntegranteAvatarRequestDTO, IntegranteDTO, IntegranteImagemDTO } from '../../shared/model/integrante.model ';
import { APIConfig } from '../../config/api.config';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegranteService {

  constructor(private http: HttpClient) { }

  private readonly ENDPOINT: string = 'integrantes';
  private readonly URL: string = APIConfig.CADASTROS_API_URL
    + "/"
    + APIConfig.CADASTROS_API_VERSION
    + "/"
    + this.ENDPOINT;
  private urlPrepared = "";


  public async listAll(paginateFilter: ConsultarIntegranteRequestDTO):
    Promise<ConsultarIntegranteResponseDTO> {
    this.urlPrepared = this.URL + "?paginacao.paginaAtual=" +
      paginateFilter!.paginacao!.paginaAtual +
      "&paginacao.itensPorPagina=" +
      paginateFilter!.paginacao!.itensPorPagina;
    if (paginateFilter!.paginacao!.camposOrdenacao!.length > 0) {
      for (let i = 0; i < paginateFilter!.paginacao!.camposOrdenacao!.length; i++) {
        this.urlPrepared = this.urlPrepared +
          "&paginacao.camposOrdenacao=" + paginateFilter!.paginacao!.camposOrdenacao![i];
      }
    }
    /*
        if ( (paginateFilter.nomeAtual !== null) && ()){
          this.urlPrepared = this.urlPrepared +
            "&nomeAtual=" + paginateFilter.nomeAtual;
        }
        if (paginateFilter.nomeConjuge !== null) {
          this.urlPrepared = this.urlPrepared +
            "&nomeConjuge=" + paginateFilter.nomeConjuge;
        }
        if (paginateFilter.idGrupo !== null) {
          this.urlPrepared = this.urlPrepared +
            "&idGrupo=" + paginateFilter.idGrupo;
        }
        if (paginateFilter.idAncestral !== null) {
          this.urlPrepared = this.urlPrepared +
            "&idAncestral=" + paginateFilter.idAncestral;
        }
            */
    if (paginateFilter.idStatus !== null) {
      this.urlPrepared = this.urlPrepared +
        "&idStatus=" + paginateFilter.idStatus;
    }
    if (paginateFilter.aceito !== null) {
      this.urlPrepared = this.urlPrepared +
        "&aceito=" + paginateFilter.aceito;
    }
    /*
    if (paginateFilter.idAncestral !== null) {
      this.urlPrepared = this.urlPrepared +
        "&idAncestral=" + paginateFilter.idAncestral;
    }
        */
    return await this.http.get<any>(this.urlPrepared)
      .toPromise()
      .then(data => { return data; });
  }

  public listIntegrantesByGrupo(idGrupo: number): Observable<IntegranteDTO[]> {
    return this.http.get<IntegranteDTO[]>(this.URL + "/geracao/" + idGrupo);

  }

  public listIntegrantesByGeracao(): Observable<IntegranteDTO[]> {
    return this.http.get<IntegranteDTO[]>(this.URL + "/geracao_grupo/1");

  }

  public listIntegrantesByAncestral(idAncestral: number): Observable<IntegranteDTO[]> {
    return this.http.get<IntegranteDTO[]>(this.URL + "/descendentes/" + idAncestral);

  }

  /*
 public async listIntegrantesByGrupo(idGrupo: number): Promise<IntegranteDTO[]> {
    return await this.http.get<any>(this.URL + "/geracao/" + idGrupo)
      .toPromise()
      .then(data => { return data; });
  }
*/

  public async atualizaAvatars(atualizar: IntegranteAvatarRequestDTO): Promise<IntegranteDTO> {
    return await this.http.put<any>(this.URL + "/avatar/ ", atualizar)
      .toPromise()
      .then(data => { return data; });
  }


  public async create(integrante: IntegranteDTO): Promise<IntegranteDTO> {
    return await this.http.post<any>(this.URL, integrante)
      .toPromise()
      .then(data => { return data; });
  }

  public update(integrante: IntegranteDTO): Observable<IntegranteDTO> {
    return this.http.put(this.URL + "/" + integrante.id, integrante);
  }

  public contByStatus(status: number): Observable<number> {
    return this.http.get<number>(this.URL + "/conta_status/" + status);
  }

  public contTipoDocumento(tipo: String): Observable<number> {
    return this.http.get<number>(this.URL + "/conta_img_docto/" + tipo);
  }

  public getById(id: number): Observable<IntegranteDTO> {
    return this.http.get<IntegranteDTO>(this.URL + "/" + id);
  }

  public async listDocumentosByIntegrante(idIntegrante: number): Promise<IntegranteImagemDTO[]> {
    return await this.http.get<any>(this.URL + "/docto/" + idIntegrante)
      .toPromise()
      .then(data => { return data; });
  }

  public async addImagem(item: IntegranteImagemDTO): Promise<IntegranteImagemDTO[]> {
    return await this.http.put<any>(this.URL + "/addimagem/", item)
      .toPromise()
      .then(data => { return data; });
  }

  public async deleteImagem(idImagem: number): Promise<void> {
    return await this.http.delete<any>(this.URL + "/imagem/" + idImagem)
      .toPromise()
      .then(data => { return data; });
  }


  public async listImagensByIntegrante(dto: ConsultarImagemIntegranteRequestDTO): Promise<IntegranteImagemDTO[]> {
    return await this.http.get<any>(this.URL + "/images/?tipo=" + dto.tipo + "&idIntegrante=" +
      dto.idIntegrante)
      .toPromise()
      .then(data => { return data; });
  }

  public listAniversariantes(mes: number): Observable<AniversariantesDTO[]> {
    return this.http.get<AniversariantesDTO[]>(this.URL + "/aniversariantes/" + mes);

  }


}
