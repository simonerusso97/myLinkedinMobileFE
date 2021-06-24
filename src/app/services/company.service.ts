import { Injectable } from '@angular/core';
import {Company} from '../models/company';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type':  'application/json',
    })
  };
  company: Company;

  constructor(private http: HttpClient) { }


  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>('http://localhost:8080/company/registrationCompany', company, this.httpOptions);
  }

  login(comapny: Company): Observable<Company> {
    return this.http.post<Company>('http://localhost:8080/company/login', comapny, this.httpOptions);
  }

  findAll(): Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:8080/company/findAll');
  }
}
