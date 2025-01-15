import { Component, OnInit } from '@angular/core';
import { RepairsService } from '../../../../../shared/services/repairs.service';
import { Repair, RepairRequest } from '../../../../../shared/models/repair';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-active-repairs',
  imports: [CommonModule,MatIconModule,MatProgressSpinnerModule,MatButtonModule ,RouterModule,MatCardModule],
  templateUrl: './active-repairs.component.html',
  styleUrl: './active-repairs.component.scss'
})
export class ActiveRepairsComponent implements OnInit {
  isLoading: boolean = true;
  repairs: Repair[] = [];
  clicked:boolean=true;

  constructor(private repairsService: RepairsService,private router: Router) {}

  ngOnInit(): void {
    this.getActiveRepairsForToday();
  }

  getActiveRepairsForToday(): void {
    this.repairsService.getActiveRepairsForToday().subscribe({
      next: (data) => {
        this.repairs = data; 
        console.log("Response Data:", data);
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error fetching repairs:', err);
        this.isLoading = false;  
      }
    });
  }

  markAsCompleted(repairId: number): void {
    this.repairsService.getRepairById(repairId).subscribe({
      next: (repair) => {
        const updateRepair: RepairRequest = {
          ...repair,
          status: 2,
        };
        this.repairsService.updateRepair(repairId, updateRepair).subscribe({
          next: () => {
            console.log('Repair marked as completed.');
            this.repairs = this.repairs.filter((repair) => repair.id !== repairId);// afairesh tou owner apo to active repair list 
          },
          error: (err) => {
            console.error('Error updating repair status:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching repair details:', err);
      },
    });
  }
}
