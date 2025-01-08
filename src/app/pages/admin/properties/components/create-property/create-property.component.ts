import { AfterViewInit, Component } from '@angular/core';
import { PropertiesFormComponent } from '../properties-form/properties-form.component';

@Component({
  selector: 'app-create-property',
  imports: [PropertiesFormComponent],
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.scss'
})
export class CreatePropertyComponent implements AfterViewInit {
  isLoading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }
}
