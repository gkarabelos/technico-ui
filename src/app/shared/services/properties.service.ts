import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Property, PropertyRequest } from '../models/property';
import { VatValidationResponse } from '../models/vatValidationResponse';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private readonly apiUrl: string = `${environment.apiBaseUrl}/Property`;

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  getPropertyById(id: number): Observable<Property> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Property>(url);
  }

  createProperty(propertyData: PropertyRequest): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, propertyData);
  }

  updateProperty(id: number, propertyData: PropertyRequest): Observable<Property> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Property>(url, propertyData);
  }

  deleteProperty(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  validateOwnerVat(vatNumber: string): Observable<VatValidationResponse> {
    const url = `${environment.apiBaseUrl}/Owner/validate-owner-vat/${vatNumber}`;
    return this.http.get<VatValidationResponse>(url);
  }
}
