import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select'; // PrimeNG Moderno
import { ChartModule } from 'primeng/chart'; // Importe o ChartModule

interface Integrante {
  id: number;
  nome: string;
  sexo: 'Masculino' | 'Feminino';
  politica: 'Direita' | 'Esquerda' | 'Centro';
  localizacao: 'Rio de Janeiro' | 'São Paulo' | 'Minas Gerais';
}

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, FormsModule, Select, ChartModule],
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent {
  // Opções do seletor de temas
  temas = [
    { label: 'Gênero (Sexo)', value: 'sexo' },
    { label: 'Posicionamento Político', value: 'politica' },
    { label: 'Localização (Estado)', value: 'localizacao' }
  ];

  temaSelecionado = signal<string>('sexo');

  // Banco de dados simulado dos integrantes
  integrantes = signal<Integrante[]>([
    { id: 1, nome: 'Ana', sexo: 'Feminino', politica: 'Esquerda', localizacao: 'Rio de Janeiro' },
    { id: 2, nome: 'Carlos', sexo: 'Masculino', politica: 'Direita', localizacao: 'São Paulo' },
    { id: 3, nome: 'Mariana', sexo: 'Feminino', politica: 'Centro', localizacao: 'Minas Gerais' },
    { id: 4, nome: 'Bruno', sexo: 'Masculino', politica: 'Direita', localizacao: 'São Paulo' },
    { id: 5, nome: 'Julia', sexo: 'Feminino', politica: 'Esquerda', localizacao: 'São Paulo' },
    { id: 6, nome: 'Rodrigo', sexo: 'Masculino', politica: 'Centro', localizacao: 'Rio de Janeiro' }
  ]);

  // Opções globais de estilização moderna para o Chart.js (Donut/Pizza)
  chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#495057',
          usePointStyle: true,
          font: { size: 13, weight: '500' }
        }
      }
    },
    maintainAspectRatio: false,
    cutout: '60%' // Transforma a pizza em uma rosca (Donut) muito mais moderna
  };

  // Cálculo Dinâmico e Reativo dos dados do Gráfico
  chartData = computed(() => {
    const dados = this.integrantes();
    const tema = this.temaSelecionado();
    
    // Mapeia e conta as ocorrências baseado no tema escolhido
    const contagem: { [key: string]: number } = {};
    dados.forEach((item: any) => {
      const valor = item[tema];
      contagem[valor] = (contagem[valor] || 0) + 1;
    });

    const labels = Object.keys(contagem);
    const data = Object.values(contagem);

    // Paleta de cores moderna e sutil estilo Dashboard Premium
    const coresPadrao: { [key: string]: string[] } = {
      sexo: ['#6366f1', '#ec4899'], // Roxo, Rosa
      politica: ['#ef4444', '#3b82f6', '#10b981'], // Vermelho, Azul, Verde
      localizacao: ['#f59e0b', '#06b6d4', '#8b5cf6'] // Laranja, Ciano, Roxo Escuro
    };

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: coresPadrao[tema] || ['#3b82f6', '#10b981', '#f59e0b'],
          borderWidth: 0 // Remove contornos pretos ou brancos brutas
        }
      ]
    };
  });
}
