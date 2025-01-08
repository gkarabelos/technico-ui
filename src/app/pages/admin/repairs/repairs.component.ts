import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-repairs',
  imports: [],
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
