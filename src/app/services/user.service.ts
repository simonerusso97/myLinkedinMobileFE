import { Injectable } from '@angular/core';
import {Applicant} from '../models/applicant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Regular} from '../models/regular';
import {Offeror} from '../models/offeror';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';

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

  createApplicant(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>('http://localhost:8080/user/registrationApplicant', applicant, this.httpOptions);
  }

  createOfferor(offeror: Offeror): Observable<Offeror> {
    return this.http.post<Offeror>('http://localhost:8080/user/registrationOfferor', offeror, this.httpOptions);
  }

  findByEmailAndPasswor(regular: Regular): Observable<Offeror> {
    return this.http.post<Offeror>('http://localhost:8080/user/createOfferor', regular, this.httpOptions);
  }

  login(regular: Regular): Observable<Offeror | Applicant> {
    return this.http.post<Offeror | Applicant>('http://localhost:8080/user/login', regular, this.httpOptions);
  }

  updateInterested(user: Regular, idPost: number): Observable<User> {
    return this.http.post<User>('http://localhost:8080/post/updateInterestedList/'+idPost, user, this.httpOptions);
  }

  updateCandidation(user: Regular, idPost: number): Observable<User> {
    return this.http.post<User>('http://localhost:8080/post/updateCandidation/'+idPost, user, this.httpOptions);
  }

  unsavePost(user: Offeror | Applicant, idPost: number): Observable<Regular> {
    return this.http.post<Regular>('http://localhost:8080/post/unsavePost/'+idPost, user, this.httpOptions);
  }
}
