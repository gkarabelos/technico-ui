import { AfterViewInit, Component, Input, signal, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string; 
}

@Component({
  selector: 'app-drawer',
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent implements AfterViewInit {
  drawerCollapsed = signal(false)
  @Input() set collapsed(val: boolean) {
    this.drawerCollapsed.set(val);
  }
  isLoading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 150);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: 'home',
    },
    {
      icon: 'people',
      label: 'Property Owners<br>& Properties',
      route: 'properties',
    },
    {
      icon: 'build',
      label: 'Repairs',
      route: 'repairs',
    }
  ]);
}
