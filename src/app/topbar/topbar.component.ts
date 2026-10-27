import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}