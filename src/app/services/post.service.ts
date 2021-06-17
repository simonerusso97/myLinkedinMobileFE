import { Injectable } from '@angular/core';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post: Post;
  constructor() { }
}
