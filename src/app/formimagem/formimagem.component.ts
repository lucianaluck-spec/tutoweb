import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs'; // PrimeNG Moderno
import { GalleriaModule } from 'primeng/galleria';
import { FileUpload } from 'primeng/fileupload';
import { Button } from 'primeng/button';
import { ImagemView } from '../shared/model/grupo.model';
import { IntegranteService } from '../cadastrar/services/integrante.service';
import { ConsultarImagemIntegranteRequestDTO, IntegranteAvatarRequestDTO, IntegranteDTO, IntegranteImagemDTO } from '../shared/model/integrante.model ';
import { ChangeDetectorRef } from '@angular/core';
import { AuthenticatedUser } from '../shared/model/security.model';
import { AppService } from '../shared/services/app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppMessageService } from '../shared/services/app-message.service';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-formimagem',
  standalone: true,
  imports: [
    CommonModule, 
    Tabs, TabList, Tab, TabPanels, TabPanel, // v18/v19/v21+
    GalleriaModule, 
    FileUpload, 
    Button,
    FormsModule,          // 2. ADICIONE AQUI para liberar o uso do ngModel
    ReactiveFormsModule
  ],
  providers: [MessageService, AppMessageService], // 🌟 ADICIONE O PROVEDOR DIRETAMENTE AQUI
    
  templateUrl: './formimagem.component.html',
  styleUrls: ['./formimagem.component.scss']
})

export class FormImagemComponent implements OnInit {

  
  // Responsividade do Carrossel PrimeNG Galleria
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 }
  ];

  // Coleção de Objetos baseada na sua interface ImageView
  colecaoImagens = signal<ImagemView[]>([]);

  // Coleção de Documentos
  colecaoDocumentos = signal<ImagemView[]>([]);
  imgRecourse: SafeResourceUrl;
   imgRecourseImage: SafeResourceUrl;
  pdfRecourseImage: SafeResourceUrl;
  descricaoImagem: string = "";
  descricaoDocto: string = "";
  integranteImagem: IntegranteImagemDTO = new IntegranteImagemDTO();


  public user: AuthenticatedUser;
  private messageService = inject(AppMessageService);

   constructor(private cd: ChangeDetectorRef,
    private integranteService: IntegranteService,
    private sanitizer: DomSanitizer,
    public appService: AppService
  ) {
    this.sanitizer = inject(DomSanitizer);
    this.imgRecourse = this.sanitizer.bypassSecurityTrustResourceUrl.bind(this.sanitizer);;
    this.imgRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl.bind(this.sanitizer);;
    this.pdfRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl.bind(this.sanitizer);;
    this.user = this.appService.getAuthenticatedUser()!;
  
   
  }

  ngOnInit() {
    this.viewImages();
    this.viewDoctos();
  }

  private addImg() {
    console.log("Adicionando ", this.integranteImagem);
    if (this.integranteImagem.descricao === '') {
      this.messageService.showError("Descrição precisa ser preenchida");
    } else {
      this.integranteService.addImagem(this.integranteImagem)
        .then(data => {
          this.messageService.showSuccess('Imagem Adicionada com sucesso!');
          this.viewImages();

        })
        .catch(e => {
          console.error(e);
          this.messageService.showError(e.error);
        });
    }
  }

  onUploadDocto(event: any) {

    for (let file of event.files) {
            file.arrayBuffer().then((data: ArrayBuffer) => {
                var base64String = this.arrayBufferToBase64(data);

        this.integranteImagem = new IntegranteImagemDTO();
        this.integranteImagem.idIntegrante = this.user.idIntegrante;
        this.integranteImagem.imagemString = base64String;
        this.integranteImagem.tipoDocumento = "pdf";
        this.integranteImagem.usuarioCadastro = "tuto admin";
        this.integranteImagem.descricao = "documento";

        var Hoje = new Date();
        Hoje.setDate(Hoje.getDate() - 1);
        this.addImg();

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

  viewImages() {
    var idIntegrante = 111;                                                                 
    this.colecaoImagens = signal<ImagemView[]>([]);
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
           this.colecaoImagens.update(prev => [...prev, item]);
          
        }

      })

    }


  }

  viewDoctos() {
    var idIntegrante = this.user.idIntegrante;
    this.colecaoDocumentos = signal<ImagemView[]>([]);
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
          this.colecaoDocumentos.update(prev => [...prev, item]);
        }
      })

    }

  }


  // Handler para Adicionar Imagens no Carrossel
  onImageAdd(event: any) {
    const file = event.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      // Evita o erro de unsafe bypassando a segurança com o sanitizer
      const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);

      const novaImagem: ImagemView = {
        id: Date.now(),
        title: file.name,
        alt: 'Nova imagem carregada',
        descricao: `Tamanho: ${(file.size / 1024).toFixed(1)} KB`,
        previewImageSrc: safeUrl,
        thumbnailImageSrc: safeUrl // No Mock, usamos a mesma para miniatura
      };

      // Atualiza o Signal instantaneamente (A tela atualiza na hora sem precisar clicar)
      this.colecaoImagens.update(prev => [...prev, novaImagem]);
    }
  }

  onUploadImage(event: any) {

    for (let file of event.files) {
            file.arrayBuffer().then((data: ArrayBuffer) => {
                var base64String = this.arrayBufferToBase64(data);

        this.integranteImagem = new IntegranteImagemDTO();
        this.integranteImagem.idIntegrante = this.user.idIntegrante;
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

  // Handler para Adicionar Documentos
  onDocumentAdd(event: any) {
    const file = event.files[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const novoDoc: ImagemView = {
        id: Date.now(),
        descricao: file.name
      };

      this.colecaoDocumentos.update(prev => [...prev, novoDoc]);
    }
  }

  removerImagem(id?: number) {
    if (!id) return;
    this.colecaoImagens.update(prev => prev.filter(img => img.id !== id));
  }

  removerDocumento(id: number) {
    this.colecaoDocumentos.update(prev => prev.filter(doc => doc.id !== id));
  }
}
