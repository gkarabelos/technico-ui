import { AfterViewInit, Component } from '@angular/core';
import { OwnersFormComponent } from '../owners-form/owners-form.component';
import { ActivatedRoute } from '@angular/router';
import { OwnersService } from '../../../../../shared/services/owners.service';

@Component({
  selector: 'app-update-owner',
  imports: [OwnersFormComponent],
  templateUrl: './update-owner.component.html',
  styleUrl: './update-owner.component.scss'
})
export class UpdateOwnerComponent implements AfterViewInit {
  selectedOwner: any;
  isLoading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  constructor(
    private route: ActivatedRoute,
    private ownersService: OwnersService
  ) {}

  ngOnInit(): void {
    const ownerId = this.route.snapshot.paramMap.get('id');
    if (ownerId) {
      this.fetchOwnerData(+ownerId);
    }
  }

  fetchOwnerData(id: number): void {
    this.ownersService.getOwnerById(id).subscribe((owner) => {
      console.log("Selected Owner: ", owner)
      this.selectedOwner = owner;
    });
  }
}
