/* eslint-disable quote-props,@typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Structure} from '../models/structure';
import {Skill} from '../models/skill';
import {Post} from '../models/post';
import {Commento} from '../models/commento';

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

  findAllStructureByUserType(userType: string): Observable<Structure[]> {
    return this.http.get<Structure[]>('http://localhost:8080/structure/getByType/'+userType,);
  }

  findAllSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>('http://localhost:8080/post/getAllSkill/');
  }

  findAllPostByUserType(type: string): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/post/findAllPost/' + type);
  }


  findPost(post: Post): Observable<Post> {
    return this.http.get<Post>('http://localhost:8080/post/findPostById/' + post.id);
  }

  sendComment(post: Post, comment: Commento): Observable<Commento> {
    return this.http.patch<Commento>('http://localhost:8080/post/saveComment/' + post.id , comment);
  }

  sendAnswer(post: Post, answer: Commento, parentId): Observable<Commento> {
    return this.http.patch<Commento>('http://localhost:8080/post/saveComment/' + post.id + '/' + parentId , answer);
  }

  createPost(post: Post): Observable<number> {
    return this.http.post<number>('http://localhost:8080/post/save', post, this.httpOptions);
  }

  upload(file: any, idPost: number, type: string) {
    const formData: FormData = new FormData();

    if(type === 'pdf'){
      formData.append('file', file);
    }
    else{
      const blob = this.convertBase64ToBlob(file);
      formData.append('file', blob);
    }
    return this.http.post<HttpEvent<any>>('http://localhost:8080/api/attachment/uploadFile/'+idPost+'/'+type, formData, {responseType: 'text'} as any);
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
