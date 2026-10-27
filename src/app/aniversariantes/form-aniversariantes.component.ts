import { Component, signal, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select'; // PrimeNG Moderno (substitui o antigo Dropdown)
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AniversariantesDTO } from '../shared/model/integrante.model ';
import { IntegranteService } from '../cadastrar/services/integrante.service';


@Component({
  selector: 'app-aniversariantes',
  standalone: true,
  imports: [CommonModule, FormsModule, Select, TableModule, Button, InputText],
  templateUrl: './form-aniversariantes.component.html',
  styleUrls: ['./form-aniversariantes.component.scss']
})
export class AniversariantesComponent {
  // Lista de meses estruturada para o p-select moderno
  meses = [
    { label: 'Janeiro', value: 1 }, { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 }, { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 }, { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 }, { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 }, { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 }, { label: 'Dezembro', value: 12 }
  ];

  // Obtém o mês atual do sistema como padrão inicial
  mesSelecionado: number = (new Date().getMonth() + 1);
  filtroNome = signal<string>('');

  // Banco de dados simulado dos integrantes
  todosAniversariantes: AniversariantesDTO[] = [];

  constructor(private cd: ChangeDetectorRef,
              private integranteService: IntegranteService

  ) {

    this.mesSelecionado = new Date().getMonth() + 1;
    this.listar();
  }

  listar() {
    this.integranteService.listAniversariantes(this.mesSelecionado!).subscribe({
      next: (data) => {
        this.todosAniversariantes = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        // this.loading = false;
      }
    });
  }

  // Adicione esse método dentro da classe do seu componente:
  enviarMensagemWhatsapp(integrante: any) {
    const primeiroNome = integrante.nomeAtual.split(' ')[0];

    // Mensagem personalizada elegante
    const mensagem = `Olá ${primeiroNome}! Passando para te desejar um Feliz Aniversário! 🥳 Que o seu dia seja repleto de alegrias, saúde e muito sucesso. Parabéns! 🎉`;

    // Codifica o texto para o formato aceito em URLs
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Se você tiver o número de telefone salvo no objeto do colaborador (ex: colaborador.telefone)
    // use ele no link. Caso contrário, abre para escolher o contato.
    let url = '';
    if (integrante.telefone) {
      // Remove caracteres especiais do telefone deixando apenas números
      const foneLimpo = integrante.telefone.replace(/\D/g, '');
      url = `https://whatsapp.com{foneLimpo}&text=${mensagemCodificada}`;
    } else {
      url = `https://whatsapp.com{mensagemCodificada}`;
    }

    // Abre em uma nova aba do navegador de forma segura
    window.open(url, '_blank');
  }

}
