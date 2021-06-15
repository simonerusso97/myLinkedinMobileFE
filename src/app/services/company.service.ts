import { Injectable } from '@angular/core';
import {Company} from '../models/company';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }


  createCompany(company: Company) {
    return this.http.post<Company>('http://localhost:8080/company/createCompany', company, this.httpOptions);
  }
}
