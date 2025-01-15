import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Repair, RepairRequest } from "../models/repair";
import { PaginatedResult } from "../models/pagination";
import { VatValidationResponse } from "../models/vatValidationResponse";
import { e9ValidationResponse } from "../models/e9ValidationResponse";

@Injectable({
    providedIn: 'root',
  })
  export class RepairsService {
    private readonly apiUrl: string = `${environment.apiBaseUrl}/Repair`;
  
    constructor(private http: HttpClient) {}

    getAllRepairs(): Observable<Repair[]> {
        return this.http.get<Repair[]>(this.apiUrl);
      }

    geRepairById(id: number): Observable<Repair> {
          const url = `${this.apiUrl}/${id}`;
          return this.http.get<Repair>(url);
        }
    validateE9(E9: string): Observable<e9ValidationResponse> {
        const url = `${environment.apiBaseUrl}/Property/get-property-id/${E9}`;
        return this.http.get<e9ValidationResponse>(url);
      }

    createRepair(repairData: RepairRequest): Observable<Repair> {
          return this.http.post<Repair>(this.apiUrl, repairData);
        }

        deleterRepair(id: number): Observable<void> {
          const url = `${this.apiUrl}/${id}`;
          return this.http.delete<void>(url);
        } 
  

    getActiveRepairsForToday(): Observable<Repair[]> {
        const url = `${this.apiUrl}/today`;
        return this.http.get<Repair[]>(url);
      }

    getPaginatedProperties(page: number, pageSize: number, searchTerm: string = ''): Observable<PaginatedResult<Repair>> {
        const params = {
          page: page.toString(),
          pageSize: pageSize.toString(),
          searchTerm: searchTerm
        };
        return this.http.get<PaginatedResult<Repair>>(`${this.apiUrl}/paginated`, { params });
      }
  }