import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RepairsService } from '../../../../shared/services/repairs.service';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../../../../shared/services/properties.service';
@Component({
  selector: 'app-repairs-form',
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatSnackBarModule,
    ],
  templateUrl: './repairs-form.component.html',
  styleUrl: './repairs-form.component.scss'
})
export class RepairsFormComponent implements OnInit, OnChanges {
  @Input() mode: 'update' = 'update';
  @Input() repairData: any;
  updateRepairsForm: FormGroup;
  currentYear: number = new Date().getFullYear();
  repairId!: number;
  properties: any[] = [];
  propertyAddress: string = '';

  constructor(private fb: FormBuilder,
    private repairsService: RepairsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private propertiesService: PropertiesService,
    ){
    this.updateRepairsForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit() {
   this.fetchRepairs();
  }

  fetchRepairs(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.repairId = +id; // Convert the string to a number
    } else {
      this.showSnackBar('Repair ID is missing from the route!', 'error');
    }
 
    if (this.mode === 'update' && this.repairId) {
      // Fetch repair data based on the 'id'
      this.repairsService.getRepairById(this.repairId).subscribe((data) => {
        this.repairData = data;
        this.propertyAddress = data.propertyAddress || 'Unknown Address';
        this.propertiesService.getPropertyById(data.propertyId).subscribe((propertyData) => {
        this.propertyAddress = propertyData.address || 'Unknown Address';
      });
        this.populateForm(this.repairData);
      });
    }
  }

  

  ngOnChanges(changes: SimpleChanges) {
    console.log("i got to repair form");
    if (changes['repairData'] && changes['repairData'].currentValue) {
      this.populateForm(changes['repairData'].currentValue);
    }
  }

  populateForm(data: any) {
    const formattedDate = data.date ? this.formatDate(data.date) : '';
    console.log("i got to repair form");
    this.updateRepairsForm.patchValue({
      date: formattedDate,
      type: data.type || '',
      description: data.description || '',
      cost: data.cost || '',
      propertyId: data.propertyId || null,
    });
  }
  

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  submitForm() {
    console.log("i got to repair form");
    if (this.updateRepairsForm.invalid) {
      console.log("form submited");
      this.updateRepairsForm.markAllAsTouched();
      return;
    }

    const formValue = this.updateRepairsForm.value;

    if (this.mode === 'update') {
      this.handleUpdate(formValue);
    }
  }

  handleUpdate(formValue: any) {
    // Assuming propertyId is stored and linked to repair
    const repairData = {
      ...formValue,
      propertyId: this.repairData.propertyId, // Auto-assign the Property ID
      date: `${formValue.date}T00:00:00`, // Convert back to ISO 8601 if necessary
    };
  
    this.repairsService.updateRepair(this.repairData.id, repairData).subscribe({
      next: () => {
        this.showSnackBar('Repair updated successfully!', 'success');
      },
      error: (err) => {
        console.error(err);
        this.showSnackBar('Failed to update repair.', 'error');
      },
    });
  }

  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar'],
    });
  }

}
