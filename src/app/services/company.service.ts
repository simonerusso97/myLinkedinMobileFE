import { Injectable } from '@angular/core';
import {Company} from '../models/company';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  login(company: Company): Observable<Company> {
    return this.http.get<Company>('http://localhost:8080/company/login/' + company.name + '/' + company.password);
  }
}
