import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { OwnersFormComponent } from '../owners-form/owners-form.component';

@Component({
  selector: 'app-create-owner',
  imports: [OwnersFormComponent],
  templateUrl: './create-owner.component.html',
  styleUrl: './create-owner.component.scss'
})
export class CreateOwnerComponent implements AfterViewInit {
  isLoading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }
}
