import { Injectable } from '@angular/core';
import {Post} from '../models/post';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Applicant} from "../models/applicant";
import {Observable} from "rxjs";
import {Regular} from "../models/regular";
import {JsonDocument} from "../models/json-document";
import { User } from '../models/user';

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

  updateInterested(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/post/updateInterestedList', post, this.httpOptions);
  }

  updateCandidation(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/post/updateCandidation', post, this.httpOptions);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/post/save', post, this.httpOptions);
  }

  getPostSaved(user:Regular):Observable<Post[]>{
    
    return this.http.post<Post[]>('http://localhost:8080/post/getAllSavedPost', user, this.httpOptions);
  }

  unsave(post: Post): Observable<Post> {
    return this.http.delete<Post>('http://localhost:8080/post/unSavedPost/'+post.id);

  }


}
