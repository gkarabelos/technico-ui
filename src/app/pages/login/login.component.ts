import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
    console.log("hello admin")
    this.authService.login(this.credentials).subscribe((success) => {
      if (success) {
        this.router.navigate(['/home']); 
      } else {
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    });
  }
}