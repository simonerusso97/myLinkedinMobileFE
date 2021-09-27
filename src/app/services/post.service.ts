/* eslint-disable quote-props,@typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Structure} from '../models/structure';
import {Skill} from '../models/skill';
import {Post} from "../models/post";
import {Regular} from "../models/regular";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  httpOptionsPlain = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }),
    'responseType': 'text'
  };

  constructor(private http: HttpClient) { }

  findAllStructure(userType: string): Observable<Structure[]> {
    return this.http.get<Structure[]>('http://localhost:8080/structure/getByType/'+userType,);
  }

  findAllSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>('http://localhost:8080/post/getAllSkill/');
  }

  findAllPostByUserType(type: string): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/post/findAllPost/' + type);
  }



}
