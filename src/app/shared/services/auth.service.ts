import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = `${environment.apiBaseUrl}/Owner`; 
  private isLoggedIn = false;
  constructor(private http: HttpClient) {}
  login(credentials: { username: string; password: string }): Observable<boolean> {
    return this.http.post<{ success: boolean }>(this.apiUrl, credentials).pipe(
      map((response) => {
        this.isLoggedIn = response.success;
        return response.success; // Ensure the returned value is a boolean
      }),
      catchError(() => {
        this.isLoggedIn = false;
        return of(false);
      })
    );
  }
  logout(): void {
    this.isLoggedIn = false;
  }
Authenticated(): boolean {
    return this.isLoggedIn;
  }
}