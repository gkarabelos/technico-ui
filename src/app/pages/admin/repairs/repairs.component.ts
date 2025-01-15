import { AfterViewInit, Component } from '@angular/core';
import { RepairListComponent } from './components/repair-list/repair-list.component';

@Component({
  selector: 'app-repairs',
  imports: [RepairListComponent],
  templateUrl: './repairs.component.html',
  styleUrl: './repairs.component.scss'
})
export class RepairsComponent implements AfterViewInit {
  isLoaded: boolean = false;
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 150);
  }
}
