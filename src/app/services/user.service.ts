import { Injectable } from '@angular/core';
import {Regular} from '../models/regular';
import {Offeror} from '../models/offeror';
import {Observable} from 'rxjs';
import {Applicant} from '../models/applicant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Company} from '../models/company';
import {User} from '../models/user';
import {Post} from '../models/post';
import {Message} from '../models/message';

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

  applicatSignUp(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>('http://localhost:8080/user/applicatSignUp', applicant, this.httpOptions);
  }


  offerorSignUp(offeror: Offeror): Observable<Offeror> {
    return this.http.post<Offeror>('http://localhost:8080/user/offerorSignUp', offeror, this.httpOptions);
  }

  findOfferorNotVerifed(company: Company): Observable<Offeror[]> {
    return this.http.get<Offeror[]>('http://localhost:8080/user/findOfferorNotVerifed/' + company.id);
  }

  acceptOfferor(offeror: Offeror) {
    return this.http.patch<Offeror>('http://localhost:8080/user/acceptOfferor', offeror);
  }

  updateInterested(user: Regular, interestedPostList: Post[]): Observable<Post> {
    return this.http.patch<Post>('http://localhost:8080/user/updateInterestedList/' + user.id, interestedPostList, this.httpOptions);
  }

  findAllInterestedPost(user: Regular): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/user/findAllInterestedPost/' + user.id);

  }

  getAllMessage(user: User): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:8080/user/getAllMessage/' + user.id);
  }

  findAllUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/user/getAllUser');

  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>('http://localhost:8080/user/sendMessage', message, this.httpOptions);
  }
}
