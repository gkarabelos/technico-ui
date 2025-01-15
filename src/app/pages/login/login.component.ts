import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  imports : [
      CommonModule,
      FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
    console.log("hello admin")
    console.log("Credentials:",this.credentials)
    this.authService.login(this.credentials).subscribe((success) => {
      if (success) {
        this.router.navigate(['/home']); 
      } else {
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    });
  }
}
