import { Injectable } from '@angular/core';
import {Applicant} from '../models/applicant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Regular} from '../models/regular';
import {Offeror} from '../models/offeror';
import {Observable, of} from 'rxjs';
import {Company} from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }



  createApplicant(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>('http://localhost:8080/user/createApplicant', applicant, this.httpOptions);
  }

  createOfferor(offeror: Offeror): Observable<Offeror> {
    return this.http.post<Offeror>('http://localhost:8080/user/createOfferor', offeror, this.httpOptions);
  }

  findByEmailAndPasswor(regular: Regular): Observable<Offeror> {
    return this.http.post<Offeror>('http://localhost:8080/user/createOfferor', regular, this.httpOptions);
  }

  login(regular: Regular): Observable<any> {
    return this.http.post<any>('http://localhost:8080/user/login', regular, this.httpOptions);

  }
}
