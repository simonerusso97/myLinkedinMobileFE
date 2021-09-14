import { Injectable } from '@angular/core';
import {Regular} from '../models/regular';
import {Offeror} from "../models/offeror";
import {Observable} from "rxjs";
import {Applicant} from "../models/applicant";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  login(regular: Regular): Observable<Offeror | Applicant> {
    return this.http.get<Offeror | Applicant>('http://localhost:8080/user/login/'+ regular.email + '/' + regular.password);
  }
}
