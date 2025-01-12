import { Component, OnInit } from '@angular/core';
import { RepairsService } from '../../../../../shared/services/repairs.service';
import { Repair } from '../../../../../shared/models/repair';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-active-repairs',
  imports: [CommonModule,MatIconModule,MatProgressSpinnerModule,MatButtonModule ,RouterModule,],
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

  // Fetch active repairs for today
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
}
