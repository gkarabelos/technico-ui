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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-repairs-form',
  providers: [provideNativeDateAdapter()],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatSnackBarModule,
      MatDatepickerModule,MatNativeDateModule,MatTimepickerModule
    ],
  templateUrl: './repairs-form.component.html',
  styleUrl: './repairs-form.component.scss'
})
export class RepairsFormComponent implements OnInit, OnChanges {
  @Input() mode: 'update' = 'update';
  @Input() repairData: any;
  @Input() propertyData: any;
  updateRepairsForm: FormGroup;
  currentYear: number = new Date().getFullYear();
  repairId!: number;
  properties: any[] = [];
  propertyAddress: string = '';
  propertyE9: string ='';

  repairStatus=[
    { value: 0, label: "Pending" },
    { value: 1, label: "In Progress" },
    { value: 2, label: "Complete" },
  ];

  constructor(private fb: FormBuilder,private repairsService: RepairsService,private snackBar: MatSnackBar,private route: ActivatedRoute,private propertiesService: PropertiesService,
    ){
    this.updateRepairsForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required], // Add time control
      type: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]],
      status: ['', Validators.required],
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
      this.showError('Repair ID is missing from the route!');
    }
 
    if (this.mode === 'update' && this.repairId) {
      this.repairsService.getRepairById(this.repairId).subscribe((data) => {
        this.repairData = data;
        console.log("Data of prop: ",data);
        this.propertyAddress = data.propertyAddress || 'Unknown Address';
        this.propertiesService.getPropertyById(data.propertyId).subscribe((propertyData) => {
        this.propertyAddress = propertyData.address || 'Unknown Address';
        this.propertyE9=propertyData.e9 || 'Unknown Id'
      });
        this.populateForm(this.repairData);//vazei ta idi uparxon data sto form
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['repairData'] && changes['repairData'].currentValue) {
      this.populateForm(changes['repairData'].currentValue);
    }
  }

  populateForm(data: any) {
    const formattedDate = data.date ? this.formatDate(data.date) : '';
    this.updateRepairsForm.patchValue({
      date: formattedDate,
      type: data.type || '',
      description: data.description || '',
      cost: data.cost || '',
      propertyId: data.propertyId || null,
      status: data.status !== null && data.status !== undefined ? data.status : '',
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
    const time = this.updateRepairsForm.get('datetime')?.value;  // Get the Date object from the form control
    if (time) {
      const formattedTime = this.convertTo24HourFormat(time);
      // Optionally, you can update the form value or make further changes to the date
      const currentDate = this.updateRepairsForm.get('date')?.value; // Get the selected date
      if (currentDate) {
        // Combine date and time to form a complete ISO string
        const combinedDateTime = `${currentDate}T${formattedTime}`;
        this.updateRepairsForm.get('datetime')?.setValue(combinedDateTime);  // Update the datetime form control
      }
    }
  }
  submitForm() {
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
  handleUpdate(formValue: any) {
    const date = formValue.date; // Date from datepicker
    const time = formValue.time; // Time from timepicker
    const combinedDatetime = this.combineDateAndTime(date, time);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Combined Datetime:', combinedDatetime); // Debug the combined value
    const repairData = {
      ...formValue,
      propertyId: this.repairData.propertyId, // Auto-assign the Property ID
      date: combinedDatetime, // Store combined datetime
    };

    this.repairsService.updateRepair(this.repairData.id, repairData).subscribe({
      next: () => {
        this.showSuccess('Repair updated successfully!');
      },
      error: (err) => {
        console.error(err);
        this.showError('Failed to update repair.');
      },
    });
  }



  //Error and Success Alert UI
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

}
