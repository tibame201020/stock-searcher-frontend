import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CodeParam } from '../models/CodeParam';
import { StockData } from '../models/StockData';
import { CompanyStatus } from '../models/CompanyStatus';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getCodeNmList(key: string): Observable<CompanyStatus[]>{
    return this.http.post<CompanyStatus[]>(environment.apiUrl + '/findCompaniesByKeyWord',key);
  }

  getStockData(codeParam:CodeParam): Observable<StockData[]> {
    return this.http.post<StockData[]>(environment.apiUrl + '/findStockInfo', codeParam);
  }


}
