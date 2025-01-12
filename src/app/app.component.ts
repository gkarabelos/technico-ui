import { AfterViewInit, Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawerComponent } from './shared/components/drawer/drawer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from "./pages/login/login.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule,
    DrawerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  adminColor: string = 'orange'; // Set this to any color dynamically

  collapsed = signal(false)
  drawerWidth = computed(() => this.collapsed() ? '65px' : '250px');
  isLoading = true;
  
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url == '/login';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }
}
