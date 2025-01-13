import { AfterViewInit, Component } from '@angular/core';
import { OwnersTableComponent } from '../owners-table/owners-table.component';

@Component({
  selector: 'app-search-owner',
  imports: [OwnersTableComponent],
  templateUrl: './search-owner.component.html',
  styleUrl: './search-owner.component.scss'
})
export class SearchOwnerComponent implements AfterViewInit {
  isLoading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }
}
