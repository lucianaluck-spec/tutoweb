import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { IntegranteService } from './services/integrante.service';
import { IntegranteDTO, IntegranteAvatarRequestDTO } from '../shared/model/integrante.model ';
import { GrupoService } from '../grupo/services/grupo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';

import { GrupoDTO, GrupoImagemDTO, ImagemView } from '../shared/model/grupo.model';
import { ButtonModule } from 'primeng/button';
import { ChangeDetectorRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api'; // Importação do PrimeNG
import { AppMessageService } from '../shared/services/app-message.service';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [
        FormsModule,
        CarouselModule,
        ButtonModule,
        DialogModule,
        ReactiveFormsModule,
        DialogModule,
        FormsModule,
        ButtonModule,
        CheckboxModule,
        FileUploadModule,
        Select,
        InputMaskModule,
        CheckboxModule,
        FileUploadModule,
        ToastModule
    ],
    providers: [MessageService, AppMessageService], // 🌟 ADICIONE O PROVEDOR DIRETAMENTE AQUI
    templateUrl: './cadastrar.component.html',
    styleUrls: ['./cadastrar.component.scss']

})

export class CadastrarComponent implements OnInit {
    @Input() visible = false;
    @Input() modo: 'Pertenço' | 'Não encontrei a minha Geração' = 'Pertenço';

    geracao: GrupoDTO = new GrupoDTO();

    ancestrais: IntegranteDTO[] = [];
    form: FormGroup;

    grupos: GrupoDTO[] = [];
    grupo: GrupoDTO = new GrupoDTO();
    integrantes: IntegranteDTO[] = [];
    ancestraisForm: IntegranteDTO[] = [];
    indiceGrupo: number = 0;
    images: any[] = [];
    totalIntegrantes: number = 0;
    imgRecourse: SafeResourceUrl = "/assets/img/avatar_indefinido.png";
    imgRecourseConjuge: SafeResourceUrl = "";
    imgRecourseGeracao1: SafeResourceUrl = "";
    imgRecourseConjugeGeracao1: SafeResourceUrl = "";
    nomeAtualGeracao1: String = "";
    nomeConjugeGeracao1: String = "";
    responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    exibirDialog: boolean = false;
    exibirDialogSem: boolean = false;

    sexos = [
        { label: 'FEMININO', value: 'FEMININO' },
        { label: 'MASCULINO', value: 'MASCULINO' }
    ];

    semAncestral: boolean = false;
    iniciaDialog: boolean = false;
    initialFormData: IntegranteDTO = new IntegranteDTO();
    foto: String = "";
    fotoConjuge: String = "";
    imgRecourseForm: SafeResourceUrl = "";

    private message = inject(AppMessageService);


    constructor(private cd: ChangeDetectorRef, private router: Router,
        private grupoService: GrupoService,
        private integranteService: IntegranteService,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            nomeAtual: ['', Validators.required],
            dataNascimento: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            telefone: ['', Validators.required],
            nomeConjugeAtual: [''],
            sexo: ['', Validators.required],
            idAncestral: [],
            nome1Ancestral: [''],
            nome2Ancestral: [''],
            nome3Ancestral: ['']
        });
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.cd.detectChanges();
            setTimeout(() => {

            });
        }, 100);
        this.integranteService.listIntegrantesByGeracao().subscribe({
            next: (data) => {
                this.integrantes = data;
                if (this.integrantes[0] !== undefined) {
                    this.nomeAtualGeracao1 = this.integrantes[0].nomeAtual!;
                    this.nomeConjugeGeracao1 = this.integrantes[0].nomeConjugeAtual!;
                    // this.loading = false;
                    this.imgRecourseGeracao1 =
                        this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
                            this.integrantes[0].fotoString);
                    this.imgRecourseConjugeGeracao1 =
                        this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
                            this.integrantes[0].fotoStringConjuge);

                }
                this.grupoService.listAll().then(data => {
                    this.grupos = data;
                    this.indiceGrupo = 1;
                    this.buscaIntegrantesByGrupo(this.indiceGrupo);

                });
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
                // this.loading = false;
            }
        });
    }

    proximo(): void {
        if (this.indiceGrupo < this.grupos.length) {
            this.indiceGrupo++;
            this.buscaIntegrantesByGrupo(this.indiceGrupo);
        }
    }

    anterior(): void {
        if (this.indiceGrupo > 1) {

            this.indiceGrupo--;
            this.buscaIntegrantesByGrupo(this.indiceGrupo);
        }
    }

    private buscaIntegrantesByGrupo(indice: number) {
        this.grupo = this.grupos[indice];

        this.integranteService.listIntegrantesByGrupo(this.grupo.id!).subscribe({
            next: (data) => {
                this.integrantes = data;
                this.totalIntegrantes = this.integrantes.length;
                this.viewImages();
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
                // this.loading = false;
            }
        });
    }

    viewImages() {
        this.images = [];
        for (var i = 0; i < this.integrantes.length; i++) {
            var item = new ImagemView();
            item.alt = "Avatar de " + this.integrantes[i].nomeAtual;
            item.title = this.integrantes[i].nomeAtual;
            item.ancestral = "filho(a) [" +
                this.integrantes[i].nomeAncestral;
            item.datas = this.integrantes[i].datas;

            if ((this.integrantes[i].fotoString !== null) &&
                (this.integrantes[i].fotoString!.length > 0)) {

                item.origem = this.integrantes[i].fotoString;

                this.imgRecourse =
                    this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
                        item.origem);
                item.thumbnailImageSrc = this.imgRecourse;
                item.previewImageSrc = this.imgRecourse;

            } else {
                if (this.integrantes[i].sexo === null) {
                    this.imgRecourse = "/assets/img/avatar_indefinido.png";
                } else {
                    if (this.integrantes[i].sexo === "FEMININO") {
                        this.imgRecourse = "/assets/img/avatar_feminino2.jpeg";
                    } else {
                        this.imgRecourse = "/assets/img/images.png";
                    }
                }

                item.origem = "";

                item.thumbnailImageSrc = this.imgRecourse;
                item.previewImageSrc = this.imgRecourse;
            }

            if ((this.integrantes[i].fotoStringConjuge !== null) &&
                (this.integrantes[i].fotoStringConjuge!.length > 0)) {

                item.origem = this.integrantes[i].fotoStringConjuge;

                this.imgRecourseConjuge =
                    this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
                        item.origem);
                item.thumbnailImageSrcConjuge = this.imgRecourseConjuge;
                item.previewImageSrcConjuge = this.imgRecourseConjuge;


            } else {
                if ((this.integrantes[i].nomeConjugeAtual !== null) &&
                    (this.integrantes[i].nomeConjugeAtual!.length > 0)) {
                    this.imgRecourseConjuge = "/assets/img/avatar_indefinido.png";
                    item.origem = "";
                    item.thumbnailImageSrcConjuge = this.imgRecourseConjuge;
                    item.previewImageSrcConjuge = this.imgRecourseConjuge;
                } else {
                    this.imgRecourseConjuge = "/assets/img/avatar_indefinido.png";
                    item.origem = "semconjuge";
                    item.thumbnailImageSrcConjuge = this.imgRecourseConjuge;
                    item.previewImageSrcConjuge = this.imgRecourseConjuge;
                }

            }
            this.images[i] = item;
        }
    }

    chamarFormulario(tipo: number): void {
        this.form = this.fb.group({
            nomeAtual: ['', Validators.required],
            dataNascimento: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            telefone: ['', Validators.required],
            nomeConjugeAtual: [''],
            sexo: ['', Validators.required],
            idAncestral: [],
            nome1Ancestral: [''],
            nome2Ancestral: [''],
            nome3Ancestral: ['']
        });
        this.semAncestral = false;
        this.foto = "";
        this.imgRecourse = "/assets/img/avatar_indefinido.png";
        if (tipo === 1) {
            this.modo = "Pertenço";
            this.buscaAncestrais();
        } else {
            this.modo = "Não encontrei a minha Geração";
            this.semAncestral = true;
        }
        this.exibirDialog = true;
        this.cdr.detectChanges();
    }

    limparAncestral() {
        this.form.get('idAncestral')?.setValue(null);
    }

    limparAncestralidade() {
        this.form.get('nome1Ancestral')?.setValue("");
        this.form.get('nome2Ancestral')?.setValue("");
        this.form.get('nome3Ancestral')?.setValue("");
        this.semAncestral = false;
    }

    fecharDialog() {
        this.exibirDialog = false;
    }

    buscaAncestrais(): void {
        
        if (this.grupo !== null) {
            this.integranteService.listIntegrantesByGrupo(this.grupo.id! - 1).subscribe({
                next: (data) => {
                    this.ancestrais = data;
                },
                error: (err) => {
                    console.error(err);
                    // this.loading = false;
                }
            });

        }
        else {
            this.ancestrais = [];
        }
    }

    campoInvalido(campo: string): boolean {
        const controle = this.form!.get(campo);
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
            //  this.message.showError('Alguns campos estão inválidos', 'Falha na validação');
            this.validarFormulario();
            this.form.markAllAsTouched();
            return;
        }

        const toSave = this.extractFormData();
        this.initialFormData = toSave;
        toSave.aceito = false;
        var prossegue = true;

        if (this.validarNomeComposta()) {

        } else {
            prossegue = false;
            this.message.showError('Preencha o Nome Completo', 'Falha na validação');
        }

        if (this.validarAncestrais()) {

        } else {
            prossegue = false;
            this.message.showError('Preencha Dados de Ancentrais', 'Falha na validação');
        }

        if (prossegue) {
            var msgConfirmacao = "Confirma Inclusão de seus dados ?";
            if (this.foto.length < 1) {
                msgConfirmacao = "Você nao lancou o Avatar/Foto. Deseja salvar mesmo assim"
            }

            const confirmou = window.confirm(msgConfirmacao);

            if (confirmou) {
                this.create(toSave);
            }


        }
    }

    validarFormulario(): boolean {

        const mensagens: string[] = [];

        if (this.form.get('nomeAtual')?.invalid) {
            mensagens.push('Nome é obrigatório');
        }

        if (this.form.get('email')?.invalid) {
            mensagens.push('E-mail inválido');
        }
        if (this.form.get('telefone')?.invalid) {
            mensagens.push('Telefone inválido');
        }

        if (this.form.get('dataNascimento')?.invalid) {
            mensagens.push('Data de nascimento é obrigatória');
        }

        if (this.form.get('sexo')?.invalid) {
            mensagens.push('Sexo é obrigatório');
        }

        if (mensagens.length > 0) {
            this.message.showError(mensagens.join(' | '));
            return false;
        }

        return true;
    }

    private validarNomeComposta(): boolean {
        // Remove espaços extras nas pontas e divide o nome pelas palavras
        const palavras = this.initialFormData!.nomeAtual!.trim().split(/\s+/);

        // Verifica se temos exatamente 2 palavras válidas
        return palavras.length > 1 && palavras[1].length > 0;
    }

    private validarAncestrais(): boolean {

        return (this.form!.get('idAncestral')!.value != null) ||
            (this.form!.get('nome1Ancestral')!.value != "");;
    }

    private extractFormData(): IntegranteDTO {
        return { ...this.initialFormData, ...this.form.value };
    }

    private create(toCreate: IntegranteDTO) {
        this.integranteService.create(toCreate)
            .then(data => {
                if (this.foto.length > 0) {
                    this.initialFormData = data;
                    this.atualizaAvatars();
                }
                this.buscaIntegrantesByGrupo(this.indiceGrupo);
                this.message.showSuccess('Seu pré-cadastro foi realizado com sucesso, Aguarde a liberação para o acesso.!');
                this.fecharDialog();
            })
            .catch(e => {
                console.error(e);
                this.message.showError(e.error.title, e.error.detail);
            });
    }

    cancelar() {
        this.iniciaDialog = false;
    }

    onUpload(event: any) {
        for (let file of event.files) {
            file.arrayBuffer().then((data: ArrayBuffer) => {
                var base64String = this.arrayBufferToBase64(data);
                this.foto = base64String;
                this.imgRecourse = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
                    this.foto);
                    this.cdr.detectChanges();

            });

        }
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
        integranteAvatar.fotoStringConjuge = "";
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
} 