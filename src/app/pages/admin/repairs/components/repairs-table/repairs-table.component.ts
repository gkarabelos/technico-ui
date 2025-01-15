import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Repair } from '../../../../../shared/models/repair';
import { mapStatusFromBackend } from '../../../../../shared/utils/repairStatusMapping';
import { RepairsService } from '../../../../../shared/services/repairs.service';

export interface DisplayColumn {
  def: string;
  label: string;
}

@Component({
  selector: 'app-repairs-table',
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
  templateUrl: './repairs-table.component.html',
  styleUrl: './repairs-table.component.scss',
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
export class RepairsTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  ELEMENT_DATA!: Repair[];
  dataSource = new MatTableDataSource<Repair>(this.ELEMENT_DATA);
  value: string = '';
  isLoading: boolean = true;
  disColumns!: string[];
  totalRecords: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0; 

  displayedRepairColumns: DisplayColumn[] = [ 
    { def: 'id', label: 'Id' },
    { def: 'date', label: 'Repair Date' },
    { def: 'type', label: 'Repair Type' },
    { def: 'description', label: 'Description' },
    { def: 'propertyAddress', label: 'Property Address' },
    { def: 'cost', label: 'Cost' },
    { def: 'ownerName', label: 'Name' },
    { def: 'ownerSurname', label: 'Surname' },
    { def: 'action', label: 'Action' }
  ];

  constructor(
    public dialog: MatDialog,
    private service: RepairsService,
    private alertService: AlertService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.disColumns = this.displayedRepairColumns.map(cd => cd.def);
    this.loadData(this.pageIndex, this.pageSize);
  }

  loadData(page: number, pageSize: number, searchTerm: string = ''): void {
    this.isLoading = true;
    this.service.getPaginatedRepairs(page + 1, pageSize, searchTerm).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dataSource.data = response.data.map((repair: any) => ({
          ...repair,
          status: mapStatusFromBackend(repair.status),
        }));
        console.log("Response Data:", response.data);
        this.totalRecords = response.totalRecords;
      },
      error: (err) => {
        this.isLoading = false; 
        console.error('Error fetching paginated data:', err);
      }
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

  onPageChange(event: any): void {
    const searchTerm = this.value.trim().toLowerCase();
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData(this.pageIndex, this.pageSize, searchTerm);
  }

  applyFilter(): void {
    const searchTerm = this.value.trim().toLowerCase();
    this.pageIndex = 0;
    this.paginator.firstPage();
    this.loadData(this.pageIndex, this.pageSize, searchTerm);
  }

  updateRepair(row: any): void {
    this.router.navigate(['/update-repair', row.id]);
  }

  openDeleteDialog(obj: any): void {
    const options = {
      title: 'Delete?',
      message: `Are you sure want to remove the repair with Id: ${obj.id}?`,
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
    this.service.deleteRepair(row_obj['id']).subscribe({
      next: () => {
        this.showSuccess('Repair deleted successfully.');
      },
      error: (err) => {
        console.log(err);
        let firstErrorMessage = 'Error deleting repair.';
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
