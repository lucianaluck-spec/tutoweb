import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root' // Garante que o serviço seja um Singleton na aplicação inteira
})
export class AppMessageService {
  // Uso do inject() nativo do Angular moderno em vez do construtor tradicional
  private messageService = inject(MessageService);

  showSuccess(detail: string, summary: string = 'Sucesso') {
    this.messageService.add({ severity: 'success', summary, detail, life: 3000 });
  }

  showError(detail: string, summary: string = 'Erro') {
    this.messageService.add({ severity: 'error', summary, detail, life: 5000 });
  }

  showInfo(detail: string, summary: string = 'Informação') {
    this.messageService.add({ severity: 'info', summary, detail, life: 4000 });
  }

  clear() {
    this.messageService.clear();
  }
}
