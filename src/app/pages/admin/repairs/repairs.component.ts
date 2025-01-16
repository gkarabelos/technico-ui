import { AfterViewInit, Component } from '@angular/core';
import { RepairsTableComponent } from './components/repairs-table/repairs-table.component';

@Component({
  selector: 'app-repairs',
  imports: [RepairsTableComponent],
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
