import { Injectable } from '@angular/core';
import {Post} from '../models/post';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Applicant} from "../models/applicant";
import {Observable} from "rxjs";
import {Regular} from "../models/regular";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post: Post;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }


  getPost(user: Regular): Observable<Post[]> {
    return this.http.post<Post[]>('http://localhost:8080/post/findAll', user, this.httpOptions);

  }
}
