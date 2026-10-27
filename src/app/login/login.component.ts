import {
  Component, OnInit,
  OnDestroy,
  Renderer2,
  HostBinding,
  inject
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../auth/auth.service';
import { FormGroup }   from '@angular/forms';
import { AppService }  from '../shared/services/app.service';
import { AppMessageService } from '../shared/services/app-message.service';
import { MessageService } from 'primeng/api'; // Importação do PrimeNG

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  providers: [MessageService, AppMessageService], // 🌟 ADICIONE O PROVEDOR DIRETAMENTE AQUI
    templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})

export class LoginComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'login-box';

  erro = false;
  form: FormGroup;
private message = inject(AppMessageService);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private appService: AppService
  ) {
    this.form = this.fb.group({
      email: ['', []],
      password: ['', []]
    });
  }

  async login() {
    const { email, password } = this.form.value;
    var auth = await this.appService.login(this.form.value);
    auth = this.auth.loginAuth(auth);
   if (auth) {
  console.log("logado");
      this.router.navigate(['/logado']);
    } else {
      this.message.showError('Email ou senha invalidos', 'Falha na validação');
      this.erro = true;
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastrar']);
  }

  ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}