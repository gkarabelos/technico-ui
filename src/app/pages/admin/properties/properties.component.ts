import { AfterViewInit, Component } from '@angular/core';
import { PropertiesTableComponent } from './components/properties-table/properties-table.component';

@Component({
  selector: 'app-properties',
  imports: [PropertiesTableComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements AfterViewInit {
  isLoading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }
}
