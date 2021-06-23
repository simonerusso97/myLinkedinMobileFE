import { Injectable } from '@angular/core';
import {Post} from '../models/post';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Applicant} from '../models/applicant';
import {Observable} from 'rxjs';
import {Regular} from '../models/regular';
import {Offeror} from '../models/offeror';
import {User} from '../models/user';
import {Structure} from '../models/structure';
import {Skill} from "../models/skill";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post: Post;
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }


  getPost(user: Regular): Observable<Post[]> {
    return this.http.post<Post[]>('http://localhost:8080/post/findAll', user, this.httpOptions);

  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/post/save', post, this.httpOptions);
  }

  getPostSaved(user: Regular): Observable<Post[]>{
    return this.http.post<Post[]>('http://localhost:8080/post/getAllSavedPost', user, this.httpOptions);
  }

  unsave(user: Applicant | Offeror, post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/post/unSavedPost/'+post.id, user, this.httpOptions);

  }


  findAllStructure(userType: string): Observable<Structure[]> {
    return this.http.get<Structure[]>('http://localhost:8080/structure/getByType/'+userType,);
  }

  findAllSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>('http://localhost:8080/post/getAllSkill/');
  }
}
