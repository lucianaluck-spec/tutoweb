import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit  {
isMenuOpen = false; // Controla se a sidebar está visível no mobile
items: MenuItem[] = [];

ngOnInit() {
  this.items = [

    {
      label: 'Familia',
      icon: 'pi pi-home',
      title: 'Pagina Principal e Navegação entre familiares (Arvore Genealogica)',
     routerLink: ['/logado/dashboard'] 
    },
    {
      label: 'Arvore',
      icon: 'pi pi-home',
      title: 'Pagina Principal e Navegação entre familiares (Arvore Genealogica)',
     routerLink: ['/logado/arvore'] 
    },
  {
    label: 'Dados Pessoais',
    icon: 'pi pi-user',
    title: 'Visualização e atualizção dos seus dados pessoais',
    routerLink: ['/logado/cadastro'] 
  
  },
  {
    label: 'Adicionar imagens',
    icon: 'pi pi-image',
    title: 'Adiciona novas imagens ao seu perfil',
    routerLink: ['/logado/addimagem'] 
  
  },
  {
    label: 'Possiveis Familiares',
    icon: 'pi pi-users',
    title: 'Familiares que acreditam participar da familia',
    routerLink: '/logado/possiveis'
    },
  {
    label: 'Novo Integrante',
    icon: 'pi pi-user-plus',
    title: 'Adicionar um novo integrante',
    routerLink: '/logado/addintegrante'
  
  },
  {
      label: 'Aniversariantes',
      icon: 'pi pi-home',
      title: 'Pagina Principal e Navegação entre familiares (Arvore Genealogica)',
     routerLink: ['/logado/aniversariantes'] 
    },
  {
    label: 'Estatísticas',
    icon: 'pi pi-chart-bar',
    title: 'Gerador de Estatisticas baseado nos temas cadastrados',
    routerLink: '/logado/graficos'
  
  },
  {
    label: 'Notificações',
    icon: 'pi pi-comments',
    title: 'Notificações do Sistema (Aniversariantes, falecimentos)',
    routerLink: '/logado/temas'
  
  },
  {
    label: 'Agenda',
    icon: 'pi pi-list',
    title: 'Visualizações de contatos de integrantes',
    routerLink: '/logado/temas'
  
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    title: 'Sair do Sistema (Logout)',
    routerLink: '/login'
  
  }

  ];

}

toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}