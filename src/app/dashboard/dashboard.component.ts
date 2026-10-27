import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth/auth.service';
import { CardModule } from 'primeng/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IntegranteService } from '../cadastrar/services/integrante.service';
import { AuthenticatedUser } from '../shared/model/security.model';
import { AppService } from '../shared/services/app.service';
import { IntegranteAncestralResponseDTO, IntegranteDTO } from '../shared/model/integrante.model ';
import { FileUploadModule } from 'primeng/fileupload';
import { GrupoDTO, ImagemView } from '../shared/model/grupo.model';
import { CarouselModule } from 'primeng/carousel';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  standalone: true,
  imports: [ButtonModule, CardModule, FileUploadModule, CarouselModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  foto: String = "";
  fotoConjuge: String = "";
  imgRecourseAux!: SafeResourceUrl;
  imgRecourse!: SafeResourceUrl;
  imgRecourseConjuge!: SafeResourceUrl;
  imgRecourseConjugeAux!: SafeResourceUrl;
  imgRecourseImage!: SafeResourceUrl;
  pdfRecourseImage!: SafeResourceUrl;
  imgRecourseAncestral!: SafeResourceUrl;
  imgRecourseConjugeAncestral!: SafeResourceUrl;
  
  images: any[] = [];
  integrantes: IntegranteDTO[] = [];
  integrante: IntegranteDTO = new IntegranteDTO();
  ancestral: IntegranteAncestralResponseDTO = new IntegranteAncestralResponseDTO();
  fotoAncestral: String = "";
  fotoConjugeAncestral: String = "";
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

  public user: AuthenticatedUser;

  constructor(private auth: AuthService, private router: Router,
    private integranteService: IntegranteService,
    private sanitizer: DomSanitizer,
    public appService: AppService,
    private cdr: ChangeDetectorRef,
  ) {
    /*
    this.imgRecourseAux = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourse = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseConjuge = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseConjugeAux = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.pdfRecourseImage = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseAncestral = this.sanitizer.bypassSecurityTrustResourceUrl;
    this.imgRecourseConjugeAncestral = this.sanitizer.bypassSecurityTrustResourceUrl;
    */
    this.user = this.appService.getAuthenticatedUser()!;
     this.integrante.grupo = new GrupoDTO();
  }

  ngOnInit() {
    setTimeout(() => {
      this.cdr.detectChanges();
      setTimeout(() => {

      });
    }, 100);
    this.integranteService.getById(this.user.idIntegrante!).subscribe({
      next: (record) => {
        this.integrante = record;
        this.ancestral = record.ancestral!;
        this.atualizaFoto(this.integrante);
        this.atualizaFotoAncestral(this.ancestral);
        
        this.integranteService.listIntegrantesByAncestral(record!.id!).subscribe({
          next: (dataDesc) => {
            this.integrantes = dataDesc;
            this.viewImages();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error(err);

          }
        });

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
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

  atualizaFotoAncestral(record?: IntegranteAncestralResponseDTO): void {
    if ((record!.fotoString !== undefined) && (record!.fotoString !== '') && (record!.fotoString !== null)) {
      this.foto = record!.fotoString;
      this.imgRecourseAncestral = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
        record!.fotoString);

    } else {
      this.foto = "";
      this.imgRecourseAncestral = "/assets/img/default-profile.png"
    }
    if ((record!.fotoStringConjuge !== undefined) && (record!.fotoStringConjuge !== '')
      && (record!.fotoStringConjuge !== null)) {
      this.fotoConjugeAncestral = record!.fotoStringConjuge!;
      this.imgRecourseConjugeAncestral = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
        record!.fotoStringConjuge);
    } else {
      this.fotoConjugeAncestral = "";
      this.imgRecourseConjugeAncestral = "/assets/img/default-profile.png"
    }
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

        this.imgRecourseAux =
          this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
            item.origem);
        item.thumbnailImageSrc = this.imgRecourseAux;
        item.previewImageSrc = this.imgRecourseAux;

      } else {
        if (this.integrantes[i].sexo === null) {
          this.imgRecourseAux = "/assets/img/avatar_indefinido.png";
        } else {
          if (this.integrantes[i].sexo === "FEMININO") {
            this.imgRecourseAux = "/assets/img/avatar_feminino2.jpeg";
          } else {
            this.imgRecourseAux = "/assets/img/images.png";
          }
        }

        item.origem = "";

        item.thumbnailImageSrc = this.imgRecourseAux;
        item.previewImageSrc = this.imgRecourseAux;
      }

      if ((this.integrantes[i].fotoStringConjuge !== null) &&
        (this.integrantes[i].fotoStringConjuge!.length > 0)) {

        item.origem = this.integrantes[i].fotoStringConjuge;

        this.imgRecourseConjugeAux =
          this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +
            item.origem);
        item.thumbnailImageSrcConjuge = this.imgRecourseConjugeAux;
        item.previewImageSrcConjuge = this.imgRecourseConjugeAux;
      } else {
        if ((this.integrantes[i].nomeConjugeAtual !== null) &&
          (this.integrantes[i].nomeConjugeAtual!.length > 0)) {
          this.imgRecourseConjugeAux = "/assets/img/avatar_indefinido.png";
          item.origem = "";
          item.thumbnailImageSrcConjuge = this.imgRecourseConjugeAux;
          item.previewImageSrcConjuge = this.imgRecourseConjugeAux;
        } else {
          this.imgRecourseConjugeAux = "/assets/img/avatar_indefinido.png";
          item.origem = "semconjuge";
          item.thumbnailImageSrcConjuge = this.imgRecourseConjugeAux;
          item.previewImageSrcConjuge = this.imgRecourseConjugeAux;
        }

      }
      this.images[i] = item;
    }
  }

}