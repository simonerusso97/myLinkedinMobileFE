import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";

@Component({
  selector: 'app-saved-post',
  templateUrl: './saved-post.page.html',
  styleUrls: ['./saved-post.page.scss'],
})
export class SavedPostPage implements OnInit {

  post: Post = {} as Post;
  postList: Post[] = [];
  constructor() { }

  ngOnInit() {
    this.post = {
      company: undefined,
      createdBy: undefined,
      hide: false,
      id: 0,
      name: "",
      pubblicationDate: undefined,
      report: 0,
      structure: undefined
    };
    this.postList.unshift(this.post);
    this.post = {
      company: undefined,
      createdBy: undefined,
      hide: false,
      id: 0,
      name: "",
      pubblicationDate: undefined,
      report: 0,
      structure: undefined
    };
    this.postList.unshift(this.post);
    this.post = {
      company: undefined,
      createdBy: undefined,
      hide: false,
      id: 0,
      name: "",
      pubblicationDate: undefined,
      report: 0,
      structure: undefined
    };
    this.postList.unshift(this.post);
  }

}
