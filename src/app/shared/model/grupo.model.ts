import { SafeResourceUrl } from "@angular/platform-browser";

export class GrupoDTO {
  id?: number;
  descricao?: string;
  geracao?: number;
  tipoSequencia?: string;
  fotosString?: String[];
}

export class GrupoImagemDTO {
  idGrupo?: number;
  imagemString?: String;
  usuarioCadastro?: String;
  dataCadastro?: Date;
  
}

export class ImagemView {
  previewImageSrc?: SafeResourceUrl;
  thumbnailImageSrc?: SafeResourceUrl;
  previewImageSrcConjuge?: SafeResourceUrl;
  thumbnailImageSrcConjuge?: SafeResourceUrl;
  alt?: String;
  title?: String;
  origem?: String;
  descricao?: String;
  id?: number;
  ancestral?: String;
  datas?: String;
  tipo?: String;
}