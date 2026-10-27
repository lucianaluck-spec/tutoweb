import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component'; 
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {}