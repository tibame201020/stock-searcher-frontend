import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CodeParam } from '../models/CodeParam';
import { StockData } from '../models/StockData';
import { CompanyStatus } from '../models/CompanyStatus';
import { StockBumpy } from '../models/StockBumpy';
import { StockMAResult } from '../models/StockMAResult';
import { CodeList } from '../models/CodeList';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  getCodeNmList(key: string): Observable<CompanyStatus[]> {
    return this.http.post<CompanyStatus[]>(
      environment.apiUrl + '/findCompaniesByKeyWord',
      key
    );
  }

  getStockData(codeParam: CodeParam): Observable<StockData[]> {
    return this.http.post<StockData[]>(
      environment.apiUrl + '/findStockInfo',
      codeParam
    );
  }

  getAllRangeOfHighAndLowPoint(codeParam: CodeParam): Observable<StockBumpy[]> {
    return this.http.post<StockBumpy[]>(
      environment.apiUrl + '/getAllRangeOfHighAndLowPoint',
      codeParam
    );
  }

  getStockMa(codeParam: CodeParam): Observable<StockMAResult[]> {
    return this.http.post<StockMAResult[]>(
      environment.apiUrl + '/getStockMa',
      codeParam
    );
  }

  saveCodeList(codeList: CodeList): Observable<CodeList> {
    return this.http.post<CodeList>(
      environment.apiUrl + '/saveCodeList',
      codeList
    );
  }

  getCodeListByUser(user: string): Observable<CodeList[]> {
    return this.http.post<CodeList[]>(
      environment.apiUrl + '/getCodeListByUser',
      user
    );
  }

  getCodeList(codeListId: string): Observable<CodeList> {
    return this.http.post<CodeList>(
      environment.apiUrl + '/getCodeList',
      codeListId
    );
  }

  deleteCodeList(codeListId: string): Observable<void> {
    return this.http.post<void>(
      environment.apiUrl + '/deleteCodeList',
      codeListId
    );
  }

  getIntersectionFromCodeList(codeListIds: string[]): Observable<CompanyStatus[]> {
    return this.http.post<CompanyStatus[]>(
      environment.apiUrl + '/getIntersectionFromCodeList',
      codeListIds
    );
  }

}
