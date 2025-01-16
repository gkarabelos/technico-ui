import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RepairsService } from '../../../../../shared/services/repairs.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { e9ValidationResponse } from '../../../../../shared/models/e9ValidationResponse';
import { MatNativeDateModule } from '@angular/material/core';
import{MatTimepickerModule} from'@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-repair-form',
  providers: [provideNativeDateAdapter()],
  imports:[FormsModule,CommonModule,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatSelectModule,MatInputModule,MatSnackBarModule,MatNativeDateModule,MatTimepickerModule, MatDatepickerModule],
  templateUrl: './repair-form.component.html',
  styleUrl: './repair-form.component.scss'
})
export class RepairFormComponent implements OnInit {
  @Input() mode: 'create' = 'create';
  createRepairForm: FormGroup;
  E9 : string =''

  // Initialize the form group with form controls and validators
  constructor(private fb: FormBuilder,private dataService: RepairsService, private snackBar: MatSnackBar) {
  this.createRepairForm = this.fb.group({
    date: ['', Validators.required,],
    type: ['', Validators.required],
    cost: ['', [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]], 
    description: ['', Validators.required], 
    E9: ['', Validators.required],
    time: ['', Validators.required]
  });
}

 ngOnInit(): void {
  this.mode = this.mode || 'create';
 }

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   showError(message: string) {
    this.snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  // Function to convert AM/PM time to 24-hour format
  updateDatetime() {
    const time = this.createRepairForm.get('datetime')?.value;  
    if (time) {
      const formattedTime = this.convertTo24HourFormat(time);
      // Optionally, you can update the form value or make further changes to the date
      const currentDate = this.createRepairForm.get('date')?.value; // Get the selected date
      if (currentDate) {
        // Combine date and time to form a complete ISO strin
        const combinedDateTime = `${currentDate}T${formattedTime}`;
        this.createRepairForm.get('datetime')?.setValue(combinedDateTime);  // Update the datetime form control
      }
    }
  }
  submitForm() {
    if (this.createRepairForm.invalid) {
      this.createRepairForm.markAllAsTouched(); // Show validation errors
      return;                                   // Prevent submission if the form is invalid
    }

    const formValue = { ...this.createRepairForm.value };  // Get a copy of the form values
     this.handleCreate(formValue);
}

private convertTo24HourFormat(time: Date): string {
  let hours = time.getHours();  // Get the hours from the selected time
  let minutes = time.getMinutes();  // Get the minutes from the selected time

  // Ensure hours and minutes are formatted to two digits
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}

// Method to combine date and time into ISO string
private combineDateAndTime(date: string, time: string): string {
// Ensure that both date and time are valid
if (!date || !time) {
  return '';
}

// Combine the date and time to form a proper ISO string: 'YYYY-MM-DDTHH:MM:SS'
return `${date}T${time}:00`;  // Append seconds (00) to ensure full time format
}

    handleCreate(formValue : any){
      const E9 = formValue.E9;

      this.dataService.validateE9(E9).subscribe({
            next: (response: e9ValidationResponse) => {
              console.log(this.createRepairForm.value)
              var updatedFormValue = {                //if the validation is correct continue to get propertyId
                ...this.createRepairForm.value, 
                propertyId: response.id
              };
              console.log(updatedFormValue)
        delete updatedFormValue.E9;
        console.log('POST Request: ', updatedFormValue);

        this.dataService.createRepair(updatedFormValue).subscribe({
          next: () => {
            this.showSuccess('Repair created successfully.');
            this.createRepairForm.reset();
            Object.keys(this.createRepairForm.controls).forEach((key) => {
              const control = this.createRepairForm.get(key);
              if (control) {
                control.setErrors(null);
                control.markAsPristine();
                control.markAsUntouched();
              }
            });
          },
          error: (err) => {
            console.log(err);
            this.showError(err.error?.error.message || 'An error occurred during property creation.');
          },
        });
            },
            error: (err) => {
              console.log('E9 validation error:', err);
              this.showError(err.error?.message || 'Invalid E9');
            },
          });
        }
      }


