import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginResponse{
  isValid: boolean,
  message: string
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = `${environment.apiBaseUrl}/Owner/login`; 
  private isLoggedIn = false;
  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post< LoginResponse >(this.apiUrl, null, {params: new HttpParams().set('email',credentials.email).set('password', credentials.password)}).pipe(
      tap((response) => {
        console.log("Login response:",response)
        this.isLoggedIn = response.isValid;
      }),
      catchError((err) => {
        console.log("Login response:",err)
        this.isLoggedIn = false;
        return of({isValid:false, message: 'Login failed due to an error.'});
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