import { AfterViewInit, Component } from '@angular/core';
import { PropertiesFormComponent } from '../properties-form/properties-form.component';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../../../../../shared/services/properties.service';

@Component({
  selector: 'app-update-property',
  imports: [PropertiesFormComponent],
  templateUrl: './update-property.component.html',
  styleUrl: './update-property.component.scss'
})
export class UpdatePropertyComponent implements AfterViewInit {
  selectedProperty: any;
  isLoading = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.fetchPropertyData(+propertyId);
    }
  }

  fetchPropertyData(id: number): void {
    this.propertiesService.getPropertyById(id).subscribe((property) => {
      console.log("Selected Property: ", property)
      this.selectedProperty = property;
    });
  }
}
