import { AfterViewInit, Component } from '@angular/core';
import { RepairFormComponent } from '../repair-form/repair-form.component';

@Component({
  selector: 'app-create-repair',
  imports: [RepairFormComponent],
  templateUrl: './create-repair.component.html',
  styleUrl: './create-repair.component.scss'
})
export class CreateRepairComponent implements AfterViewInit {
  isLoading = true;


 ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

}
