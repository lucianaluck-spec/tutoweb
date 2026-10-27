import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { Select } from 'primeng/select';
import { ViewEncapsulation } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';

import { GrupoDTO, ImagemView } from '../shared/model/grupo.model';
import { GrupoService } from '../grupo/services/grupo.service';
import { IntegranteService } from '../cadastrar/services/integrante.service';
import { ConsultarImagemIntegranteRequestDTO, IntegranteAvatarRequestDTO, IntegranteDTO, IntegranteImagemDTO } from '../shared/model/integrante.model ';
import { AppMessageService } from '../shared/services/app-message.service';
import { MessageService } from 'primeng/api'; // Importação do PrimeNG
import { ChangeDetectorRef } from '@angular/core';
import { AuthenticatedUser } from '../shared/model/security.model';
import { AppService } from '../shared/services/app.service';
import { MenuItem } from 'primeng/api';

import { IntroducaoDTO } from '../shared/model/introducao.model';
import { HabilitacaoDTO } from '../shared/model/habilitacao.model';
import { ProfissaoDTO } from '../shared/model/profissao.model';
import { SignoByDiaMesDTO, SignoDTO } from '../shared/model/signo.model';
import { PoliticaDTO } from '../shared/model/politica.model';
import { LocalizacaoDTO } from '../shared/model/localizacao.model';
import { ReligiaoDTO } from '../shared/model/religiao.model';
import { TimeFutebolDTO } from '../shared/model/timeFutebol.model';
import { TemperamentoDTO } from '../shared/model/temperamento.model';
import { EstiloMusicalDTO } from '../shared/model/estiloMusical.model';
import { HabitoAlimentarDTO } from '../shared/model/habitoAlimentar.model';
import { StatusDTO } from '../shared/model/integrante.model ';
import { EstiloMusicalService } from '../shared/services/estiloMusical.service';
import { HabilitacaoService } from '../shared/services/habilitacao.service';
import { HabitoAlimentarService } from '../shared/services/habitoAlimentar.service';
import { IntroducaoService } from '../shared/services/introducao.service';
import { LocalizacaoService } from '../shared/services/localizacao.service';
import { PoliticaService } from '../shared/services/politica.service';
import { ProfissaoService } from '../shared/services/profissao.service';
import { ReligiaoService } from '../shared/services/religiao.service';
import { SignoService } from '../shared/services/signo.service';
import { StatusService } from '../shared/services/status.service';
import { TemperamentoService } from '../shared/services/temperamento.service';
import { TimeFutebolService } from '../shared/services/time.service';
import { EstadoPaisRequestDTO } from '../shared/model/localizacao.model';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-formnovo',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    Select,
    InputMaskModule,
    CheckboxModule,
    FileUploadModule,
    TableModule,
    ToolbarModule,
    PanelModule,
    TabsModule,
    CardModule

  ],
  providers: [MessageService, AppMessageService],
  templateUrl: './formnovo.component.html',
  styleUrls: ['./formnovo.component.scss']
})

export class FormNovoComponent implements OnInit {

  @Input() visible = false;
  @Input() modo: 'Pertenço' | 'Não encontrei a minha Geração' = 'Pertenço';

  @Input() geracao: GrupoDTO = new GrupoDTO();

  @Output() salvarEvent =
    new EventEmitter();

  @Output() cancelarEvent =
    new EventEmitter();

  @Input()
  ancestrais: IntegranteDTO[] = [];

  form!: FormGroup;

  sexoOptions = [
    { label: 'FEMININO', value: 'FEMININO' },
    { label: 'MASCULINO', value: 'MASCULINO' }
  ];
  items: MenuItem[] | undefined;
  estado: string = "";
  pais: string = "";
  local: string = "";

  semAncestral: boolean = false;
  @Input() iniciaDialog: boolean = false;
  initialFormData: IntegranteDTO = new IntegranteDTO();
  foto: String = "";
  fotoConjuge: String = "";
  imgRecourse: SafeResourceUrl;
  imgRecourseConjuge: SafeResourceUrl;
  imgRecourseImage: SafeResourceUrl;
  pdfRecourseImage: SafeResourceUrl;

  focusByID(event: any, id: string) {
    event.preventDefault(); // Impede o submit do formulário
    const element = document.getElementById(id);

    if (element) {
      (element as HTMLSelectElement).focus();
    }
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  submitted = false;
  editing: boolean = false;
  cancelado: boolean = false;
  empesquisa: boolean = false;
  title: string = "";
  detailError: string = '';
  titleIntroducao: string = "";
  introducaoVisible: boolean = false;
  filtroProfissaoVisible: boolean = false;
  viewInformacaoDescricao: boolean = false;
  viewInformacaoNome: boolean = false;
  newLocalizacao: boolean = false;
  nroLocalizacao: number = 1;

  grupos: GrupoDTO[] = [];
  grupo: GrupoDTO = new GrupoDTO();
  profissoes: ProfissaoDTO[] = [];
  religioes: ReligiaoDTO[] = [];
  signos: SignoDTO[] = [];
  localizacoes: LocalizacaoDTO[] = [];
  localizacoesOrigem: LocalizacaoDTO[] = [];
  politicas: PoliticaDTO[] = [];
  timesFutebol: TimeFutebolDTO[] = [];
  estilosMusicais: EstiloMusicalDTO[] = [];
  habitosAlimentar: HabitoAlimentarDTO[] = [];
  habilitacoes: HabilitacaoDTO[] = [];
  temperamentos: TemperamentoDTO[] = [];
  todosStatus: StatusDTO[] = [];

  estados: string[] = [];
  estadosOrigem: string[] = [];
  introducao: IntroducaoDTO = new IntroducaoDTO();
  searchProfissao: string = "";
  searchValue: string = "";
  images: ImagemView[] = [];
  doctos: ImagemView[] = [];
  integranteImagem: IntegranteImagemDTO = new IntegranteImagemDTO();
  descricaoImagem: String = "";
  descricaoDocto: String = "";
  informacoes: any;

  private message = inject(AppMessageService);
  public user: AuthenticatedUser;

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder,
    private grupoService: GrupoService,
    private integranteService: IntegranteService,
    private profissaoService: ProfissaoService,
    private signoService: SignoService,
    private localizacaoService: LocalizacaoService,
    private religiaoService: ReligiaoService,
    private politicaService: PoliticaService,
    private timeService: TimeFutebolService,
    private estiloMusicalService: EstiloMusicalService,
    private habilitacaoService: HabilitacaoService,
    private temperamentoService: TemperamentoService,
    private habitoAlimentarService: HabitoAlimentarService,
    private introducaoService: IntroducaoService,
    private statusService: StatusService,
    private sanitizer: DomSanitizer,
    public appService: AppService
  ) {
    this.imgRecourse = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseConjuge = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.pdfRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.user = this.appService.getAuthenticatedUser()!;

    this.loadProfissoes();
    this.loadSignos();
    this.loadReligioes();
    this.loadPoliticas();
    this.loadTimes();
    this.loadEstilosMusicais();
    this.loadHabilitacao();
    this.loadHabitoAlimentar();
    this.loadTemperamentos();
    this.loadTodosStatus();

  }

  ngOnInit() {
setTimeout(() => {
            this.cd.detectChanges();
            setTimeout(() => {

            });
        }, 100);
        
    this.items = [
      { label: 'Exclui', icon: 'pi pi-times' }
    ];
    this.form = this.fb.group({
      'pais': 'Brasil',
      'paisOrigem': 'Brasil',
      'estado': '',
      'estadoOrigem': '',
      'id': null,
      'nroCadastro': null,
      'sequencia': null,
      'nomeAtual': null,
      'nomeSolteiro': '',
      'nomeConjugeAtual': '',
      'nomeConjugeAnterior': '',
      'dataNascimento': null,
      'dataFalecimento': null,
      'idGrupo': '',
      'idAncestral': '',
      'sexo': null,
      'telefone': '',
      'email': '',
      'idProfissao': '',
      'idReligiao': '',
      'idSigno': '',
      'idPolitica': '',
      'idTimeFutebol': '',
      'idLocalizacaoOrigem': '',
      'idLocalizacaoAtual': '',
      'idHabilitacao': '',
      'idTemperamento': '',
      'idHabitoAlimentar': '',
      'idEstiloMusical': '',
      'dataCadastro': null,
      'idStatus': null,
      'motivoCancelamento': null,
      'nome1Ancestral': '',
      'nome2Ancestral': '',
    });
var record = new IntegranteDTO();
        this.initialFormData = record;

        this.loadFormData();
        this.atualizaFoto(record);
    this.loadEstados(2);
    this.loadEstados(1);
    this.introducao = new IntroducaoDTO();
    this.loadLocalizacoes(1);
    this.loadLocalizacoes(2);
  }

  campoInvalido(campo: string): boolean {
    const controle = this.form.get(campo);
    if (this.iniciaDialog) return false;
    return !!(
      controle &&
      controle.invalid &&
      (controle.dirty || controle.touched)
    );
  }

  salvar() {
    this.iniciaDialog = false;
    if (this.form.invalid) {
      this.message.showError('Alguns campos estão inválidos', 'Falha na validação');
      this.form.markAllAsTouched();
      return;
    }

    this.iniciaDialog = false;
    this.visible = false;

    const toSave = this.extractFormData();
    this.initialFormData = toSave;
    if (this.validarNomeComposta()) {
      this.create(toSave);
    } else {
      this.message.showError('Preencha o Nome Completo', 'Falha na validação');

    }

  }


  buscaSigno() {
    if (this.form!.get("dataNascimento")!.value !== null) {
      let mes: string = this.form.get("dataNascimento")!.value.substring(5, 7);
      let dia: string = this.form.get("dataNascimento")!.value.substring(8, 10);

      var dto = new SignoByDiaMesDTO();
      dto.mesNascimento = mes;
      dto.diaNascimento = dia;

      this.signoService.buscaSigno(dto)
        .then(data => {
          this.form.get("idSigno")!.setValue(data.id);
        })
        .catch(e => {
          console.error(e);
          this.message.showError(e.error);
        });
    } else {
      this.form.get("idSigno")!.setValue(null);
    }
  }


  private validarNomeComposta(): boolean {
    // Remove espaços extras nas pontas e divide o nome pelas palavras
    const palavras = this.initialFormData!.nomeAtual!.trim().split(/\s+/);

    // Verifica se temos exatamente 2 palavras válidas
    return palavras.length === 2 && palavras[1].length > 0;
  }


  private loadFormData(): void {
    this.form.patchValue(this.initialFormData);
  }
  private extractFormData(): IntegranteDTO {
    return { ...this.initialFormData, ...this.form.value };
  }

  private create(toCreate: IntegranteDTO) {
    this.integranteService.create(toCreate)
      .then(data => {
        this.message.showSuccess('Novo registro incluído com sucesso!');

        this.salvarEvent.emit(
          this.form.getRawValue()
        );
      })
      .catch(e => {
        console.error(e);
        this.message.showError(e.error);
      });
  }


  cancelar() {
    this.iniciaDialog = false;
    this.cancelarEvent.emit();

  }


  onUpload(event: any) {

    for (let file of event.files) {
      file.arrayBuffer().then((data: ArrayBuffer) => {
        var base64String = this.arrayBufferToBase64(data);
        this.foto = base64String;
        this.atualizaAvatars();
      });

    }
  }


  onUploadConjuge(event: any) {

    for (let file of event.files) {

      file.arrayBuffer().then((data: ArrayBuffer) => {
        var base64String = this.arrayBufferToBase64(data);
        this.fotoConjuge = base64String;
        this.atualizaAvatars();
      });

    }
  }

  excluiFoto(): void {
    this.foto = "";
    this.atualizaAvatars();
  }


  arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  atualizaAvatars() {

    var integranteAvatar = new IntegranteAvatarRequestDTO();
    integranteAvatar.fotoString = this.foto;
    integranteAvatar.fotoStringConjuge = this.fotoConjuge;
    integranteAvatar.id = this.initialFormData.id;
    this.integranteService.atualizaAvatars(integranteAvatar)
      .then(data => {
        this.message.showSuccess('Avatar atualizado com sucesso!');
        //  this.afterSave.emit(data);
        this.atualizaFoto(data);
      })
      .catch(e => {
        console.error(e);
        //   this.messageService.showApiError(e.error);
      });
  }


  atualizaFoto(record?: IntegranteDTO): void {
    if ((record!.fotoString !== undefined) && (record!.fotoString !== '') && (record!.fotoString !== null)) {
      this.foto = record!.fotoString;
      this.imgRecourse = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
        record!.fotoString);
    } else {
      this.foto = "";
      this.imgRecourse = "/assets/img/default-profile.png"
    }
    if ((record!.fotoStringConjuge !== undefined) && (record!.fotoStringConjuge !== '')
      && (record!.fotoStringConjuge !== null)) {
      this.fotoConjuge = record!.fotoStringConjuge!;
      this.imgRecourseConjuge = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
        record!.fotoStringConjuge);
    } else {
      this.fotoConjuge = "";
      this.imgRecourseConjuge = "/assets/img/default-profile.png"
    }

  }

  converterMaiusculo(nomeCampo: string) {
    const control = this.form.get(nomeCampo);

    if (control?.value) {
      control.setValue(
        control.value.toUpperCase(),
        { emitEvent: false }
      );
    }
  }

  private loadGrupos() {
    this.grupoService.listAll().then(data => this.grupos = data);
  }

  private loadProfissoes() {
    this.profissaoService.listAll().then(data => this.profissoes = data);
  }

  private loadSignos() {
    this.signoService.listAll().then(data => this.signos = data);
  }

  private loadReligioes() {
    this.religiaoService.listAll().then(data => this.religioes = data);
  }


  private loadPoliticas() {
    this.politicaService.listAll().then(data => this.politicas = data);
  }


  private loadEstilosMusicais() {
    this.estiloMusicalService.listAll().then(data => this.estilosMusicais = data);
  }

  private loadHabilitacao() {
    this.habilitacaoService.listAll().then(data => this.habilitacoes = data);
  }

  private loadHabitoAlimentar() {
    this.habitoAlimentarService.listAll().then(data => this.habitosAlimentar = data);
  }

  private loadTemperamentos() {
    this.temperamentoService.listAll().then(data => this.temperamentos = data);
  }


  private loadTodosStatus() {
    this.statusService.listAll().then(data => this.todosStatus = data);
  }

  private loadTimes() {
    this.timeService.listAll().then(data => this.timesFutebol = data);
  }

  loadLocalizacoes(tipo: number) {
    var itemBusca = new EstadoPaisRequestDTO();
    if (tipo === 1) {
      itemBusca.estado = this.form.get("estado")!.value;
      itemBusca.pais = this.form.get("pais")!.value;

    } else {
      itemBusca.estado = this.form.get("estadoOrigem")!.value;
      itemBusca.pais = this.form.get("paisOrigem")!.value;

    }

    this.localizacaoService.listAllByPaisEstado(itemBusca).then(data => {
      if (tipo === 1) {
        this.localizacoes = data;
      } else {
        this.localizacoesOrigem = data;
      }
    })
  }


  loadEstados(tipo: number) {
    var pais = tipo === 1 ? this.form.get("pais")!.value : this.form.get("paisOrigem")!.value;
    /*
    this.localizacaoService.listEstadosByPais(pais).then(data => {
      if (tipo === 1) {
        this.estados = data
      } else {
        this.estadosOrigem = data
      }
    });
    */
  }

  viewIntroducaoOnClick(tema: string) {
    this.titleIntroducao = tema;
    this.introducaoVisible = true;
    this.introducaoService.getByTema(tema).then(data => {
      this.introducao = data;
      if (data === null) {
        this.introducao = new IntroducaoDTO();
        this.introducao.explicacao = "Explicação Geral não cadastrada";
      }

    });
  }

  clear(table: Table) {
    table.clear();
    this.searchProfissao = ''
  }

  clearSearch(table: Table) {
    table.clear();
    this.searchValue = ''
  }


  filterProfissaoOnClick() {
    this.filtroProfissaoVisible = true;
    this.introducaoService.getByTema("PROFISSAO").then(data => {
      this.introducao = data;
    });
  }

  refreshProfissaoOnClick(): void {
    this.loadProfissoes();
  }

  captureProfissao(prof: ProfissaoDTO) {
    this.form.get("idProfissao")!.setValue(prof.id);
    this.filtroProfissaoVisible = false;

  }


  viewInformacaoOnClick(tema: string) {
    this.titleIntroducao = tema;
    this.introducaoService.getByTema(tema).then(data => {
      this.introducao = data;
      if (data === null) {
        this.introducao = new IntroducaoDTO();
        this.introducao.explicacao = "Explicação Geral não cadastrada";
      }

      switch (tema) {
        case "RELIGIAO": {
          this.informacoes = this.religioes;
          this.viewInformacaoNome = true;
          break;
        }
        case "POLITICA": {
          this.informacoes = this.politicas;
          this.viewInformacaoDescricao = true;
          break;
        }
        case "TIME": {
          this.informacoes = this.timesFutebol;
          this.viewInformacaoNome = true;
          break;
        }
        case "TEMPERAMENTO": {
          this.informacoes = this.temperamentos;
          this.viewInformacaoDescricao = true;
          break;
        }
        case "ESTILO_MUSICAL": {
          this.informacoes = this.estilosMusicais;
          this.viewInformacaoNome = true;
          break;
        }
        default: { this.informacoes = null; break; }
      }
    });

  }

  captureItem(item: any) {

    this.viewInformacaoNome = false;
    this.viewInformacaoDescricao = false;
    switch (this.titleIntroducao) {
      case "RELIGIAO": {
        this.form.get("idReligiao")!.setValue(item.id);
        break;
      }
      case "POLITICA": {
        this.form.get("idPolitica")!.setValue(item.id);
        break;
      }
      case "TIME": {
        this.form.get("idTimeFutebol")!.setValue(item.id);
        break;
      }
      case "HABITO_ALIMENTAR": {
        this.form.get("idHabitoAlimentar")!.setValue(item.id);
        break;
      }
      case "TEMPERAMENTO": {
        this.form.get("idTemperamento")!.setValue(item.id);
        break;
      }

      default: { this.informacoes = null; break; }
    }

  }

  incluiLocalizacaoOnClick(nro: number) {
    this.newLocalizacao = true;
    this.nroLocalizacao = nro;
    switch (nro) {
      case 1: {
        this.pais = this.form.get('pais')!.value;
        break;
      }
      case 2: {
        this.pais = this.form.get('paisOrigem')!.value;
        break;
      }
    }

  }

  salvarLocalizacaoOnClick(): void {
    var msgConfirmacao = "Confirma inclusão de nova localização ?";


    const confirmou = window.confirm(msgConfirmacao);

    if (confirmou) {
      let localizacao = new LocalizacaoDTO();
      localizacao.estado = this.estado.toUpperCase();
      localizacao.pais = this.pais.toUpperCase();
      localizacao.nome = this.local.toUpperCase();

      this.localizacaoService.create(localizacao)
        .then(data => {
          this.message.showSuccess('Novo Localizacao incluído com sucesso!');
          //this.hideDialog();
          if (this.nroLocalizacao === 1) {
            this.form.get("idLocalizacaoAtual")!.setValue(data.id);
            this.form.get("pais")!.setValue(this.pais.toUpperCase());
            this.form.get("estado")!.setValue(this.estado.toUpperCase());
            this.loadEstados(1);
            this.loadLocalizacoes(1);
          } else {
            this.form.get("idLocalizacaoOrigem")!.setValue(data.id);
            this.form.get("paisOrigem")!.setValue(this.pais.toUpperCase());
            this.form.get("estadoOrigem")!.setValue(this.estado.toUpperCase());
            this.loadEstados(2);
            this.loadLocalizacoes(2);
          }

          this.newLocalizacao = false;
        })
        .catch(e => {
          console.error(e);
          this.message.showError(e.error);
        });
    }
  }

  focusNext(event: any) {
    event.preventDefault(); // Impede o "Enter" de submeter o form
    event.stopPropagation();
    if (event.target.parentElement.nextElementSibling) {
      console.log("pai :", event.target.parentElement.nextElementSibling);
      const nextInput = event.target.parentElement.nextElementSibling.querySelector('input', 'select', 'textarea');
      if (nextInput) {
        nextInput.focus();

      }
    } else {
      if (event.target.nextElementSibling) {
        const nextInput = event.target.nextElementSibling.querySelector('input', 'select', 'textarea');
        if (nextInput) {
          nextInput.focus();

        }
      }
    }
  }

  onChangeStatus() {
    this.cancelado = this.form.get('idStatus')!.value === '4';
  }


  onUploadImage(event: any) {

    for (let file of event.files) {
      file.arrayBuffer().then((data: ArrayBuffer) => {
        var base64String = this.arrayBufferToBase64(data);

        this.integranteImagem = new IntegranteImagemDTO();
        this.integranteImagem.idIntegrante = this.initialFormData.id;
        this.integranteImagem.imagemString = base64String;
        this.integranteImagem.tipoDocumento = "png";
        this.integranteImagem.usuarioCadastro = "tuto admin";
        this.integranteImagem.descricao = this.descricaoImagem;

        var Hoje = new Date();
        Hoje.setDate(Hoje.getDate() - 1);
        this.addImg();

      });

    }

  }



  onUploadDocto(event: any) {

    for (let file of event.files) {
      file.arrayBuffer().then((data: ArrayBuffer) => {
        var base64String = this.arrayBufferToBase64(data);

        this.integranteImagem = new IntegranteImagemDTO();
        this.integranteImagem.idIntegrante = this.initialFormData.id;
        this.integranteImagem.imagemString = base64String;
        this.integranteImagem.tipoDocumento = "pdf";
        this.integranteImagem.usuarioCadastro = "tuto admin";
        this.integranteImagem.descricao = this.descricaoDocto;

        var Hoje = new Date();
        Hoje.setDate(Hoje.getDate() - 1);
        this.addImg();

      });

    }

  }

  excluiImagem(idImagem: number) {
    var msgConfirmacao = "Confirma a exclusão da Imagem/Docto associado ao Integrante ?";


    const confirmou = window.confirm(msgConfirmacao);

    if (confirmou) {

      {
        this.integranteImagem = new IntegranteImagemDTO();
        this.integranteImagem.id = idImagem;
        this.integranteImagem.descricao = "imagem excluida";
        this.integranteImagem.usuarioCadastro = "tuto admin"
        this.excluirImagem();
      };

    }
  }

  private excluirImagem() {
    this.integranteService.deleteImagem(this.integranteImagem!.id!)
      .then(data => {
        this.message.showSuccess('Imagem/Documento excluido com sucesso!');
        this.viewImages();
        this.viewDoctos();

      })
      .catch(e => {
        console.error(e);
        this.message.showError(e.error);
      });
  }


  private addImg() {
    if (this.integranteImagem.descricao === '') {
      this.message.showError("Descrição precisa ser preenchida");
    } else {
      this.integranteService.addImagem(this.integranteImagem)
        .then(data => {
          this.message.showSuccess('Imagem Adicionada com sucesso!');
          this.viewImages();

        })
        .catch(e => {
          console.error(e);
          this.message.showError(e.error);
        });
    }
  }

  viewImages() {
    var idIntegrante = this.initialFormData.id;
    this.images = [];
    if ((idIntegrante !== undefined) && (idIntegrante !== null)) {

      const filtro = new ConsultarImagemIntegranteRequestDTO();
      filtro.idIntegrante = idIntegrante;
      filtro.tipo = "png";
      this.integranteService.listImagensByIntegrante(filtro).then(data => {
        for (var i = 0; i < data.length; i++) {
          var item = new ImagemView();
          item.alt = "imagem do Integrante";
          item.title = "imagem " + i;
          item.origem = data[i].imagemString;
          item.descricao = data[i].descricao;
          item.id = data[i].id;

          this.imgRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
            data[i].imagemString);

          item.thumbnailImageSrc = this.imgRecourseImage;
          item.previewImageSrc = this.imgRecourseImage;
          this.images[i] = item;
        }

      })

    }


  }

  viewDoctos() {
    var idIntegrante = this.initialFormData.id;
    this.doctos = [];
    if ((idIntegrante !== undefined) && (idIntegrante !== null)) {
      const filtro = new ConsultarImagemIntegranteRequestDTO();
      filtro.idIntegrante = idIntegrante;
      filtro.tipo = "pdf";
      this.integranteService.listImagensByIntegrante(filtro).then(data => {
        for (var i = 0; i < data.length; i++) {
          var item = new ImagemView();
          item.alt = "Documento do Integrante";
          item.title = "imagem " + i;
          item.origem = data[i].imagemString;
          item.descricao = data[i].descricao;
          item.id = data[i].id;

          this.pdfRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' +
            data[i].imagemString);

          item.thumbnailImageSrc = this.pdfRecourseImage;
          item.previewImageSrc = this.pdfRecourseImage;
          this.doctos[i] = item;
        }
      })

    }

  }

  cancelOnClick() {

  }

  saveonClick() {

  }

  excluiFotoConjuge() {

  }


  salvarNovaProfissao(): void {

    if (this.searchProfissao.length > 0) {
    const toSave = new ProfissaoDTO();
    toSave.descricao = this.searchProfissao;

    this.profissaoService.create(toSave)
      .then(data => {
        this.message.showSuccess('Nova Profissao incluída com sucesso!');
        this.loadProfissoes();
      })
      .catch(e => {
        console.error(e);
        this.message.showError(e.error);
      });
    }
  }


}