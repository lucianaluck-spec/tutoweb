import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LayoutComponent } from './layout/layout.component';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormImagemComponent } from './formimagem/formimagem.component';
import { InvestigacaoComponent } from './investigacao/investigacao.component';
import { FormNovoComponent } from './formnovo/formnovo.component';
import { AniversariantesComponent } from './aniversariantes/form-aniversariantes.component';
import { GraficosComponent } from './graficos/graficos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  {
    path: 'logado',
    component: LayoutComponent,
    canActivate: [authGuard],

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'cadastro',
        component: FormCadastroComponent
      },
      {
        path: 'addimagem',
        component: FormImagemComponent
      },
      {
        path: 'addintegrante',
        component: FormNovoComponent
      },
      {
        path: 'possiveis',
        component: InvestigacaoComponent
      },
      {
        path: 'aniversariantes',
        component: AniversariantesComponent
      },
      {
        path: 'graficos',
        component: GraficosComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];