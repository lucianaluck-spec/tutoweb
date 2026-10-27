import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  providers: [MessageService], // Adicione aqui para isolar o escopo do Toast
  template: `<!-- Container que escuta as mensagens do MessageService -->
    <p-toast /><router-outlet></router-outlet>`
})
export class App {}
