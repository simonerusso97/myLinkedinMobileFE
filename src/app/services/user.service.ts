import { Injectable } from '@angular/core';
import {Applicant} from '../models/applicant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Regular} from '../models/regular';
import {Offeror} from '../models/offeror';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Message} from "../models/message";

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
  user: User = {} as User;

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
    return this.http.post<User>('http://localhost:8080/user/updateInterestedList/'+idPost, user, this.httpOptions);
  }

  unsavePost(user: Regular, idPost: number): Observable<Regular> {
    return this.http.post<Regular>('http://localhost:8080/user/unsavePost/'+idPost, user, this.httpOptions);
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/user/findAll');
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>('http://localhost:8080/user/sendMessage', message, this.httpOptions);

  }

  findMessage(user: User, userChat: User): Observable<Message[]> {
    return this.http.post<Message[]>('http://localhost:8080/user/findMessage/'+userChat.id, user, this.httpOptions);
  }

  findAllMessages(user: User): Observable<Message[]> {
    return this.http.post<Message[]>('http://localhost:8080/user/findMessage', user, this.httpOptions);
  }

}
