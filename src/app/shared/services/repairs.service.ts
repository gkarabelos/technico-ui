import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Repair } from "../models/repair";

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
  }