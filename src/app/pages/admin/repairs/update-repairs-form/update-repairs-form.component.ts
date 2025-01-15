import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { RepairsService } from '../../../../shared/services/repairs.service';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../../../../shared/services/properties.service';

@Component({
  selector: 'app-update-repairs-form',
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
  templateUrl: './update-repairs-form.component.html',
  styleUrl: './update-repairs-form.component.scss'
})

export class UpdateRepairsFormComponent implements OnInit, OnChanges {
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

  constructor(private fb: FormBuilder,
    private repairsService: RepairsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private propertiesService: PropertiesService,
    ){
    this.updateRepairsForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', [Validators.required, , Validators.pattern('^\\d+(\\.\\d{1,2})?$')]],
      status: ['', Validators.required],
    });     
  }

  ngOnInit() {
   this.fetchRepairs();
  }

  fetchRepairs(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.repairId = +id;
    }else {
      this.showError('Repair ID is missing from the route!');
    }
 
    if (this.mode === 'update' && this.repairId) {
      this.repairsService.getRepairById(this.repairId).subscribe((data) => {
        this.repairData = data;
        console.log("Data of propert: ",data);
        this.propertyAddress = data.propertyAddress || 'Unknown Address';
        this.propertiesService.getPropertyById(data.propertyId).subscribe((propertyData) => {
        this.propertyAddress = propertyData.address || 'Unknown Address';
        this.propertyE9=propertyData.e9 || 'Unknown Id'
      });
        this.populateForm(this.repairData);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['repairData'] && changes['repairData'].currentValue) {
      this.populateForm(changes['repairData'].currentValue);
    }
  }

  populateForm(data: any) {
    console.log("date: ",data.date)
    const formattedDate = data.date ? this.formatDate(data.date) : '';
    const formattedTime = data.date ? this.formatTimeForInput(data.date) : '';
    this.updateRepairsForm.patchValue({
      date: formattedDate,
      time: formattedTime,
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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  private formatTimeForInput(datetimeString: string): string {
    const date = new Date(datetimeString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  updateDatetime() {
    const time = this.updateRepairsForm.get('datetime')?.value;
    if (time) {
      const formattedTime = this.convertTo24HourFormat(time);
      const currentDate = this.updateRepairsForm.get('date')?.value;
      if (currentDate) {
        const combinedDateTime = `${currentDate}T${formattedTime}`;
        this.updateRepairsForm.get('datetime')?.setValue(combinedDateTime);
      }
    }
  }
  
  submitForm() {
    console.log("date: ", this.updateRepairsForm.value);
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
    let hours = time.getHours();
    let minutes = time.getMinutes();
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  }
  

  private combineDateAndTime(date: string, time: string): string {
    if (!date || !time) {
      return '';
    }
    return `${date}T${time}:00`; 
  }

  handleUpdate(formValue: any) {
    const date = this.formatDate(formValue.date); 
    const time = formValue.time; 
    const combinedDatetime = this.combineDateAndTime(date, time);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Combined Datetime:', combinedDatetime); 
    const repairData = {
      ...formValue,
      propertyId: this.repairData.propertyId,
      date: combinedDatetime,
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
