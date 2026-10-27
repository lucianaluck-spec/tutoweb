import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IntegranteService } from '../cadastrar/services/integrante.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss']
 
})
export class HomeComponent {

  constructor(private router: Router,
          private integranteService: IntegranteService,
          private cdr: ChangeDetectorRef) {
    
  }

   ngOnInit(): void {
       this.integranteService.contByStatus(1).subscribe({
            next: (data) => {
                this.totalPre = data;
               this.cdr.detectChanges();
                
            },
            error: (err) => {
                console.error(err);
            }
        });
       this.integranteService.contByStatus(2).subscribe({
            next: (data) => {
                this.totalCadastrados = data;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
            }
        });
        this.integranteService.contTipoDocumento('pdf').subscribe({
            next: (data) => {
                this.totalDocto = data;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
            }
        });
        this.integranteService.contTipoDocumento('png').subscribe({
            next: (data) => {
                this.totalFotos = data;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
 
  totalCadastrados: number = 0;
  totalPre: number = 0;
  totalFotos: number = 0;
  totalDocto: number = 0;

  textos = [
    'Turcheta',
    'Torquetti',
    'Torqueti',
    'Torquette',
    'Torquete'
  ];

  login() {
    this.router.navigate(['login']);
  }
} 