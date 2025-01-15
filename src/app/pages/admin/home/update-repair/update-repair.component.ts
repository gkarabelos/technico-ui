import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Inject ActivatedRoute for route parameters
import { RepairsService } from '../../../../shared/services/repairs.service';
import { UpdateRepairsFormComponent } from '../../repairs/update-repairs-form/update-repairs-form.component';


@Component({
  selector: 'app-update-repair',
  templateUrl: './update-repair.component.html',
  styleUrl: './update-repair.component.scss',
  imports: [UpdateRepairsFormComponent],
})
export class UpdateRepairComponent implements AfterViewInit {
  selectedRepair: any;
  isLoading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairsService
  ) {}

  ngOnInit(): void {
    const repairId = this.route.snapshot.paramMap.get('id');
    if (repairId) {
      this.fetchPropertyData(+repairId);
    }
  }

  fetchPropertyData(id: number): void {
    this.repairService.getRepairById(id).subscribe((property) => {
      console.log("Selected Property: ", property)
      this.selectedRepair = property;
    });
  }
}
