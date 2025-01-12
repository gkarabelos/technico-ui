import { AfterViewInit, Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DrawerComponent } from './shared/components/drawer/drawer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuTrigger } from '@angular/material/menu';


import {MatMenuModule} from '@angular/material/menu';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule,
    DrawerComponent,MatMenuModule
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {


  adminColor: string = 'orange';
  collapsed = signal(false)
  drawerWidth = computed(() => this.collapsed() ? '65px' : '250px');
  isLoading = true;
  dropdownOpen: boolean = false; // Tracks dropdown state
  

  constructor(private router: Router){
    
  }
 

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown visibility
  }

  logout() {
    // Add your logout logic here (e.g., clearing auth tokens, redirecting, etc.)
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
