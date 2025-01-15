import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Repair, RepairRequest } from "../models/repair";
import { Property } from "../models/property";
import { PaginatedResult } from "../models/pagination";

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

    deleteRepair(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(url);
    }

    getPaginatedRepairs(page: number, pageSize: number, searchTerm: string = ''): Observable<PaginatedResult<Repair>> {
        const params = {
          page: page.toString(),
          pageSize: pageSize.toString(),
          searchTerm: searchTerm
        };
        return this.http.get<PaginatedResult<Repair>>(`${this.apiUrl}/paginated`, { params });
      }
  }