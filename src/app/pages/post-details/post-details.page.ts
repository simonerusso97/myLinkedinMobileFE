import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonDocument } from 'src/app/models/json-document';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

import { Applicant } from 'src/app/models/applicant';
import { Commento } from 'src/app/models/commento';




@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  constructor(private postService:PostService, private routes:Router) { }


  post:Post={}as Post;
  comment:Commento={} as Commento;

  user: Applicant;
  err:boolean=false;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('login');
    }
    this.post=this.postService.post;
  }


  back(){
    this.routes.navigateByUrl('tabs');
  }

  sendComment(){
    this.comment.date = new Date();
    this.comment.applicant=this.user;

    this.postService.sendComment(this.comment,this.postService.post).subscribe(
      response=>{
        this.postService.post.commentList.unshift(this.comment);
        this.err=false;
        this.comment = {} as Commento;
      },
      error => {
        this.err = true;
      });
  }
}
