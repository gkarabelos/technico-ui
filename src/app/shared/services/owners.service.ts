import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Owner, OwnerRequest } from '../models/owner';
import { VatValidationResponse } from '../models/vatValidationResponse';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  private readonly apiUrl: string = `${environment.apiBaseUrl}/Owner`;

  constructor(private http: HttpClient) {}

  getAllOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.apiUrl);
  }

  getOwnerById(id: number): Observable<Owner> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Owner>(url);
  }

  createOwner(ownerData: OwnerRequest): Observable<Owner> {
    return this.http.post<Owner>(this.apiUrl, ownerData);
  }

  updateOwner(id: number, ownerData: OwnerRequest): Observable<Owner> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Owner>(url, ownerData);
  }

  deleteOwner(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
