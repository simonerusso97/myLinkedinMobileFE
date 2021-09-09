import { Injectable } from '@angular/core';
import {Post} from '../models/post';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Applicant} from '../models/applicant';
import {Observable} from 'rxjs';
import {Regular} from '../models/regular';
import {Offeror} from '../models/offeror';
import {User} from '../models/user';
import {Structure} from '../models/structure';
import {Skill} from '../models/skill';
import {Commento} from '../models/commento';
import {Attached} from "../models/attached";

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

  httpOptionsPlain = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }),
    'responseType': 'text'
  };



  constructor(private http: HttpClient) { }


  getPost(user: Regular): Observable<Post[]> {
    return this.http.post<Post[]>('http://localhost:8080/post/findAll', user, this.httpOptions);

  }

  createPost(post: Post): Observable<number> {
    return this.http.post<number>('http://localhost:8080/post/save', post, this.httpOptions);
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

  sendComment(comment: Commento, post: Post) {
    return this.http.post<Commento>('http://localhost:8080/post/UpdateCommentList/'+post.id, comment, this.httpOptions);
  }

  update(file: any, idPost: number, type: string) {
    const blob = this.convertBase64ToBlob(file);
    const formData: FormData = new FormData();
    formData.append('file', blob);
    return this.http.post<HttpEvent<any>>('http://localhost:8080/api/attachment/uploadFile/'+idPost+'/'+type, formData, {responseType: 'text'} as any);
  }

  getFile(id: number): Observable<Blob>{
    return this.http.get<Blob>('http://localhost:8080/api/attachment/getFile/'+id);

  }
  findAttached(id: number): Observable<Attached[]> {
    return this.http.get<Attached[]>('http://localhost:8080/api/attachment/getAttached/'+id);
  }
  private convertBase64ToBlob(base64: string) {
    const info = this.getInfoFromBase64(base64);
    const sliceSize = 512;
    const byteCharacters = window.atob(info.rawBase64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: info.mime });
  }

  private getInfoFromBase64(base64: string) {
    const meta = base64.split(',')[0];
    const rawBase64 = base64.split(',')[1].replace(/\s/g, '');
    const mime = /:([^;]+);/.exec(meta)[1];
    const extension = /\/([^;]+);/.exec(meta)[1];
    return {
      mime,
      extension,
      meta,
      rawBase64
    };
  }


}
