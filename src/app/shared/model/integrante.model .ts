import { EstiloMusicalDTO } from "./estiloMusical.model";
import { GrupoDTO } from "./grupo.model";
import { HabilitacaoDTO } from "./habilitacao.model";
import { HabitoAlimentarDTO } from "./habitoAlimentar.model";
import { LocalizacaoDTO } from "./localizacao.model";
import { PaginacaoRequestDTO, PaginacaoResponseDTO } from "./paginacao.model";
import { PoliticaDTO } from "./politica.model";
import { ProfissaoDTO } from "./profissao.model";
import { ReligiaoDTO } from "./religiao.model copy";
import { SignoDTO } from "./signo.model";
import { TemperamentoDTO } from "./temperamento.model";
import { TimeFutebolDTO } from "./timeFutebol.model";
import { TipoSanguineoDTO } from "./tipoSanguineo.model";

/*
export class IntegranteDTO {
  id?: number;
  idProfissao?: number;
  idAncestral?: number;
  idGrupo?: number;
  isStatus?: number;
  idReligiao?: number;
  idSigno?: number;
  idTimeFutebol?: number;
  idLocalizacaoOrigem?: number;
  idLocalizacaoAtual?: number;
  idPolitica?: number;
  idEstiloMusical?: number;
  idHabilitacao?: number;
  idHabitoAlimentar?: number;
  idTemperamento?: number;
  sequencia?: number;
  nomeAtual?: String;
  nomeSolteiro?: String;
  regiaoOrigem?: String;
  regiaoAtual?: String;
  gostoMusical?: String;
  religiao?: String;
  urlLocalizacao?: String;
  nomeConjugeAtual?: String;
  nomeConjugeAnterior?: String;
  observacao?: String;
  dataNascimento?: Date;
  dataFalecimento?: Date;
  email?: String;
  telefone?: String;
  nroCadastro?: String;
  status?: String;
  aceito?: boolean;
  cancelado?: boolean;
  fotoString?: String;
  fotoStringConjuge?: String;
  sexo?: String;
  datas?: String;
  nomeAncestral?: String;
  }
  */

export class IntegranteDTO {
  idProfissao?: number;
  idAncestral?: number;
  idGrupo?: number;
  idStatus?: number;
  idReligiao?: number;
  idSigno?: number;
  idTimeFutebol?: number;
  idLocalizacaoOrigem?: number;
  idLocalizacaoAtual?: number;
  idPolitica?: number;
  idEstiloMusical?: number;
  idHabilitacao?: number;
  idHabitoAlimentar?: number;
  idTemperamento?: number;
  idTipoSanguineo?: number;
  id?: number;
  profissao?: ProfissaoDTO;
  religiao?: ReligiaoDTO;
  signo?: SignoDTO;
  timeFutebol?: TimeFutebolDTO;
  localizacaoOrigem?: LocalizacaoDTO;
  localizacaoAtual?: LocalizacaoDTO
  politica?: PoliticaDTO;
  estiloMusical?: EstiloMusicalDTO;
  temperamento?: TemperamentoDTO;
  habilitacao?: HabilitacaoDTO;
  habitoAlimentar?: HabitoAlimentarDTO;
  tipoSanguineo?: TipoSanguineoDTO;
  sequencia?: number;
  nomeAtual?: String;
  nomeSolteiro?: String;
  nomeConjugeAtual?: String;
  nomeConjugeAnterior?: String;
  dataNascimento?: Date;
  dataFalecimento?: Date;
  email?: String;
  telefone?: String;
  nroCadastro?: String;
  status?: StatusDTO;
  grupo?: GrupoDTO
  ancestral?: IntegranteAncestralResponseDTO;
  nomeAncestral?: String;
  nomeGrupo?: String;
  sexo?: string;
  fotoString?: String;
  fotoStringConjuge?: String;
  nomeCodigo?: String;
  nome1Ancestral?: String;
  nome2Ancestral?: String;
  motivoCancelamento?: String;
  nameStatus?: String;
  aceito?: Boolean;
  dataCadastro?: Date;  
  datas?: String;
  diaNasc?: number;
  mesNasc?: number;
}


export class AniversariantesDTO {
  id?: number;
  nomeAtual?: String;
  dataNascimento?: Date;
  email?: String;
  dia?: number;
  mes?: number;
  telefone?: string;
}

export class StatusDTO {
  id?: number;
  nome?: String;
  descricao?: String;
}

export class IntegranteAncestralResponseDTO {
  id?: number;
  nroCadastro?: String;
  nomeAtual?: String;
  nomeConjugeAtual?: String;
  sequencia?: number;
  grupo?: GrupoDTO;
  fotoString?: string;
  fotoStringConjuge?: String;
}

export class ConsultarIntegranteRequestDTO {
  paginacao?: PaginacaoRequestDTO;
  nomeAtual?: string;
  nomeConjuge?: string;
  idGrupo?: number;
  idAncestral?: number;
  idStatus?: number;
  aceito?: boolean;
 }

export class ConsultarIntegranteResponseDTO {
  itens?: IntegranteDTO[];
  paginacao?: PaginacaoResponseDTO
}

export class UserResponseDTO {
  id?: number;
  userName?: String;
  password?: number;
  }


export class IntegranteAvatarRequestDTO {
  id?: number;
  fotoString?: String;
  fotoStringConjuge?: String;
}

export interface CadastroDialogData {

  modo: 'novo' | 'editar';

  integrante?: IntegranteDTO;

}


export class IntegranteImagemDTO {
  id?: number;
  idIntegrante?: number;
  imagemString?: String;
  tipoDocumento?: String;
  usuarioCadastro?: String;
  dataCadastro?: Date;
  descricao?: String;
}

export class ConsultarImagemIntegranteRequestDTO {
  idIntegrante?: number;
  tipo?: String;
 }
