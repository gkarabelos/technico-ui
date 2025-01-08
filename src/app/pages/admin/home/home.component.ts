import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  isLoaded: boolean = false;
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 150);
  }
}
