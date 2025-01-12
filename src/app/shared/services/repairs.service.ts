import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Repair, RepairRequest } from "../models/repair";
import { Property } from "../models/property";

@Injectable({
    providedIn: 'root',
  })
  export class RepairsService {
    private readonly apiUrl: string = `${environment.apiBaseUrl}/Repair`;
  
    constructor(private http: HttpClient) {}
  

    getActiveRepairsForToday(): Observable<Repair[]> {
        const url = `${this.apiUrl}/today`;
        return this.http.get<Repair[]>(url);
    }

    getRepairById(id: number): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<any>(url);
    }

    updateRepair(id: number, repairData: RepairRequest): Observable<Repair> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Repair>(url, repairData);
      }
      getPropertyById(id: number): Observable<Property> {
          const url = `${this.apiUrl}/${id}`;
          return this.http.get<Property>(url);
        }
      
  }