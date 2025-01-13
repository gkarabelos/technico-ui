import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { VatValidationResponse } from '../../../../../shared/models/vatValidationResponse';
import { OwnersService } from '../../../../../shared/services/owners.service';

@Component({
  selector: 'app-owners-form',
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
  templateUrl: './owners-form.component.html',
  styleUrl: './owners-form.component.scss'
})
export class OwnersFormComponent implements OnInit, OnChanges {
  @Input() mode: 'create' | 'update' = 'create';
  @Input() ownerData: any;
  createOwnerForm: FormGroup;
  currentYear: number = new Date().getFullYear();
  
  ownerTypes = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Owner" },
  ];

  constructor(private fb: FormBuilder, private dataService: OwnersService, private snackBar: MatSnackBar) {
    this.createOwnerForm = this.fb.group({
      vatNumber: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.mode === 'update' && this.ownerData) {
      this.populateForm(this.ownerData);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ownerData'] && changes['owwnerData'].currentValue) {
      console.log('Owner Data Updated:', changes['ownerData'].currentValue);
      this.populateForm(changes['ownerData'].currentValue);
    }
  }

  populateForm(data: any) {
    this.createOwnerForm.patchValue({
      vatNumber: data.vatNumber || '',
      name: data.name || '',
      surname: data.surname || '',
      address: data.address || '',
      phoneNumber: data.phoneNumber || '',
      email: data.email || '',
      password: data.password || '',
      type: data.type !== null && data.type !== undefined ? data.type : '',
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

  submitForm() {
    if (this.createOwnerForm.invalid) {
      this.createOwnerForm.markAllAsTouched();
      return;
    }

    const formValue = { ...this.createOwnerForm.value };

    if (this.mode === 'create') {
      this.handleCreate(formValue);
    } else if (this.mode === 'update') {
      this.handleUpdate(formValue);
    }
  }

  handleCreate(formValue: any) {
    this.dataService.createOwner(formValue).subscribe({
      next: () => {
        this.showSuccess('Owner created successfully.');
        this.createOwnerForm.reset();
        Object.keys(this.createOwnerForm.controls).forEach((key) => {
          const control = this.createOwnerForm.get(key);
          if (control) {
            control.setErrors(null);
            control.markAsPristine();
            control.markAsUntouched();
          }
        });
      },
    });
  }

  handleUpdate(formValue: any) {
    this.dataService.updateOwner(this.ownerData.id, formValue).subscribe({
      next: () => {
        this.showSuccess('Owner updated successfully.');
      },
      error: (err) => {
        console.log(err);
        this.showError(err.error?.error.message || 'Error updating owner.');
      },
    });
  }
}
