import { AfterViewInit, Component } from '@angular/core';
import { ActiveRepairsComponent } from './components/active-repairs/active-repairs.component';

@Component({
  selector: 'app-home',
  imports: [ActiveRepairsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  isLoading=true;
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }
}
