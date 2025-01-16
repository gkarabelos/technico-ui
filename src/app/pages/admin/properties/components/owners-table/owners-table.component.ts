import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertiesService } from '../../../../../shared/services/properties.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { trigger, transition, query, style, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { OwnersService } from '../../../../../shared/services/owners.service';
import { mapUserTypeFromBackend } from '../../../../../shared/utils/userTypeMapping';
import { Owner } from '../../../../../shared/models/owner';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface DisplayColumn {
  def: string;
  label: string;
}

@Component({
  selector: 'app-owners-table',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './owners-table.component.html',
  styleUrl: './owners-table.component.scss',
  animations: [
    trigger('animation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0)', opacity: 1 }),
            animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
          ],
          {
            optional: true
          }
        )
      ])
    ])
  ]
})
export class OwnersTableComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  ELEMENT_DATA!: Owner[];
  dataSource = new MatTableDataSource<Owner>(this.ELEMENT_DATA);
  value: string = '';
  isLoading: boolean = false;
  disColumns!: string[];
  totalRecords: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0; 
  vatNumberSearch = '';
  emailSearch = '';

  displayedOwnerColumns: DisplayColumn[] = [ 
    { def: 'id', label: 'Id' },
    { def: 'vatNumber', label: 'VAT Number' },
    { def: 'name', label: 'Name' },
    { def: 'surname', label: 'Surname' },
    { def: 'address', label: 'Address' },
    { def: 'phoneNumber', label: 'Phone Number' },
    { def: 'email', label: 'Email' },
    { def: 'type', label: 'Type of User' },
    { def: 'action', label: 'Action' }
  ];

  constructor(
    public dialog: MatDialog,
    private service: OwnersService,
    private alertService: AlertService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.disColumns = this.displayedOwnerColumns.map(cd => cd.def);
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

  applyFilter(): void {
    this.isLoading = true;
    this.service.getFilteredOwners(this.vatNumberSearch, this.emailSearch).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dataSource.data = response.map((owner: any) => ({
          ...owner,
          type: mapUserTypeFromBackend(owner.type),
        }));
        this.dataSource.paginator = this.paginator;
        console.log("Response Data:", response);
      },
      error: (err) => {
        this.isLoading = false; 
        console.error('Error fetching data:', err);
      }
    });
  }

  updateOwner(row: any): void {
    this.router.navigate(['/update-owner', row.id]);
  }

  openDeleteDialog(obj: any): void {
    const options = {
      title: 'Delete?',
      message: `Are you sure want to remove the owner with Id: ${obj.id}?`,
      cancelText: 'NO',
      confirmText: 'YES'
    };

    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteRow(obj);
      }
    });
  }

  deleteRow(row_obj: any): void {
    const data = this.dataSource.data
    this.service.deleteOwner(row_obj['id']).subscribe({
      next: () => {
        this.showSuccess('Owner deleted successfully.');
      },
      error: (err) => {
        console.log(err);
        let firstErrorMessage = 'Error deleting owner.';
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
  }
}
