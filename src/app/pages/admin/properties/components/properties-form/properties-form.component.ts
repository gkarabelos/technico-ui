import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { PropertiesService } from '../../../../../shared/services/properties.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { VatValidationResponse } from '../../../../../shared/models/vatValidationResponse';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-properties-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
  templateUrl: './properties-form.component.html',
  styleUrl: './properties-form.component.scss'
})
export class PropertiesFormComponent implements OnInit, OnChanges {
  @Input() mode: 'create' | 'update' = 'create';
  @Input() propertyData: any;
  createPropertyForm: FormGroup;
  currentYear: number = new Date().getFullYear();
  
  propertyTypes = [
    { value: 0, label: "Detached House" },
    { value: 1, label: "Maisonet" },
    { value: 2, label: "Apartment Building" },
  ];

  constructor(private fb: FormBuilder, private dataService: PropertiesService, private snackBar: MatSnackBar) {
    this.createPropertyForm = this.fb.group({
      e9: ['', Validators.required],
      address: ['', Validators.required],
      type: ['', Validators.required],
      yearOfConstruction: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(new Date().getFullYear())]],
      ownerVatNumber: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  ngOnInit() {
    if (this.mode === 'update' && this.propertyData) {
      this.populateForm(this.propertyData);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['propertyData'] && changes['propertyData'].currentValue) {
      console.log('Property Data Updated:', changes['propertyData'].currentValue);
      this.populateForm(changes['propertyData'].currentValue);
    }
  }

  populateForm(data: any) {
    console.log("is Active:", data.isActive)
    this.createPropertyForm.patchValue({
      e9: data.e9 || '',
      address: data.address || '',
      type: data.type !== null && data.type !== undefined ? data.type : '',
      yearOfConstruction: data.yearOfConstruction || '',
      ownerVatNumber: data.vatNumber || '',
      isActive: data.isActive,
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
    if (this.createPropertyForm.invalid) {
      this.createPropertyForm.markAllAsTouched();
      return;
    }

    const formValue = { ...this.createPropertyForm.value };

    if (this.mode === 'create') {
      this.handleCreate(formValue);
    } else if (this.mode === 'update') {
      this.handleUpdate(formValue);
    }
  }

  handleCreate(formValue: any) {

    const vatNumber = formValue.ownerVatNumber;

    this.dataService.validateOwnerVat(vatNumber).subscribe({
      next: (response: VatValidationResponse) => {
        console.log(this.createPropertyForm.value)
        var updatedFormValue = { 
          ...this.createPropertyForm.value, 
          ownerId: response.id
        };
        console.log('POST Request: ', updatedFormValue);

        this.dataService.createProperty(updatedFormValue).subscribe({
          next: () => {
            this.showSuccess('Property created successfully.');
            this.createPropertyForm.reset();
            Object.keys(this.createPropertyForm.controls).forEach((key) => {
              const control = this.createPropertyForm.get(key);
              if (control) {
                control.setErrors(null);
                control.markAsPristine();
                control.markAsUntouched();
              }
            });
          },
          error: (err) => {
            console.log(err);

            let firstErrorMessage = 'Error creating property.';
            const validationErrors = err.error?.errors;

            if (validationErrors && typeof validationErrors === 'object') {
              const firstErrorKey = Object.keys(validationErrors)[0];
              if (firstErrorKey && validationErrors[firstErrorKey].length > 0) {
                firstErrorMessage = validationErrors[firstErrorKey][0];
              }
            }
            console.log("Error Message:", firstErrorMessage);
            this.showError(firstErrorMessage);
          },
        });
      },
      error: (err) => {
        console.log('VAT validation error:', err);
        this.showError(err.error?.message || 'Invalid VAT Number');
      },
    });
  }

  handleUpdate(formValue: any) {
    const vatNumber = formValue.ownerVatNumber;

    this.dataService.validateOwnerVat(vatNumber).subscribe({
      next: (response: VatValidationResponse) => {
        console.log(this.createPropertyForm.value)
        var updatedFormValue = { 
          ...this.createPropertyForm.value, 
          ownerId: response.id
        };
        console.log(updatedFormValue)
        delete updatedFormValue.ownerVatNumber;
        console.log('POST Request: ', updatedFormValue);

        this.dataService.updateProperty(this.propertyData.id, updatedFormValue).subscribe({
          next: () => {
            this.showSuccess('Property updated successfully.');
          },
          error: (err) => {
            console.log(err);
            let firstErrorMessage = 'Error updating property.';
            const validationErrors = err.error?.errors;

            if (validationErrors && typeof validationErrors === 'object') {
              const firstErrorKey = Object.keys(validationErrors)[0];
              if (firstErrorKey && validationErrors[firstErrorKey].length > 0) {
                firstErrorMessage = validationErrors[firstErrorKey][0];
              }
            }
            console.log("Error Message:", firstErrorMessage);
            this.showError(firstErrorMessage);  
          },
        });
      },
      error: (err) => {
        console.log('VAT validation error:', err);
        this.showError(err.error?.message);
      },
    });
  }
}
