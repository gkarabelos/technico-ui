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
import { Property } from '../../../../../shared/models/property';

export interface DisplayColumn {
  def: string;
  label: string;
}

@Component({
  selector: 'app-properties-table',
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
    RouterModule
  ],
  templateUrl: './properties-table.component.html',
  styleUrl: './properties-table.component.scss',
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
export class PropertiesTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  ELEMENT_DATA!: Property[];
  dataSource = new MatTableDataSource<Property>(this.ELEMENT_DATA);
  value: string = '';
  isLoading: boolean = true;
  disColumns!: string[];
  totalRecords: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0; 

  displayedPropertyColumns: DisplayColumn[] = [ 
    { def: 'id', label: 'Id' },
    { def: 'e9', label: 'Property ID' },
    { def: 'address', label: 'Property Address' },
    { def: 'yearOfConstruction', label: 'Year of Construction' },
    { def: 'type', label: 'Type of Property' },
    { def: 'vatNumber', label: 'Owners VAT Number' },
    { def: 'action', label: 'Action' }
  ];

  constructor(
    public dialog: MatDialog,
    private service: PropertiesService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.disColumns = this.displayedPropertyColumns.map(cd => cd.def);
    this.loadData(this.pageIndex, this.pageSize);
  }

  loadData(page: number, pageSize: number, searchTerm: string = ''): void {
    this.isLoading = true;
    this.service.getPaginatedProperties(page + 1, pageSize, searchTerm).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dataSource.data = response.data;
        console.log("Response Data:", response.data);
        this.totalRecords = response.totalRecords;
      },
      error: (err) => {
        console.error('Error fetching paginated data:', err);
      }
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

  updateProperty(row: any): void {
    this.router.navigate(['/update-property', row.id]);
  }

  openDeleteDialog(obj: any): void {
    const options = {
      title: 'Delete?',
      message: `Are you sure want to remove the property with Id: ${obj.id}?`,
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
    this.service.deleteProperty(row_obj['id']).subscribe({
      next: () => {
        alert('Property deleted successfully.');
      },
      error: (err) => {
        console.log(err);
        alert(err.error?.message || 'Error deleting property.');
      },
    });
  }
}
