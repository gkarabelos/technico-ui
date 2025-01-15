import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-repair-list',
  imports: [RouterModule],
  templateUrl: './repair-list.component.html',
  styleUrl: './repair-list.component.scss'
})
export class RepairListComponent {

  
  constructor(private router: Router) {}

}
