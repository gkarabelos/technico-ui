import { AfterViewInit, Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerComponent } from './shared/components/drawer/drawer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router'; 
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    DrawerComponent,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  adminColor: string = 'orange';
  collapsed = signal(false);
  drawerWidth = computed(() => this.collapsed() ? '65px' : '250px');
  isLoading = true;  // Controls if the login page or main content is displayed
  dropdownOpen: boolean = false; // Tracks dropdown state

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // In real case, replace with actual authentication logic
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false after the login process completes
    }, 200);  // Adjust the timeout for the loading simulation or remove it in real case
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown visibility
  }

  logout() {
    // Add your logout logic here (e.g., clearing auth tokens, redirecting, etc.)
    this.router.navigate(['/login']); // Navigate to the login page after logout

  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
