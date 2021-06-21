import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Applicant } from 'src/app/models/applicant';
import { Offeror } from 'src/app/models/offeror';
import { PostService } from 'src/app/services/post.service';
import {Post} from "../../models/post";


@Component({
  selector: 'app-saved-post',
  templateUrl: './saved-post.page.html',
  styleUrls: ['./saved-post.page.scss'],
})
export class SavedPostPage implements OnInit {

  post: Post = {} as Post;
  postList: Post[] = [];
  showingPostList: Post[]=[];
  user: Offeror | Applicant;
  err = false;
  constructor(private routes: Router, private postService: PostService) { 
    this.user = JSON.parse(sessionStorage.getItem('user'));
  
    
  }

  ngOnInit() { //user però deve essere un regular per il method nel backend

    this.postService.getPostSaved(this.user).subscribe(
      response => {
        this.postList = response;
        this.err = false;
        this.showingPostList=response;
      },
      error => {
        this.err = true;
      });

    
  }

unsavePost(item:Post):void{
  this.postService.unsave(item).subscribe(
    response => {
      this.postList = this.postList.filter(data => data.id !== item.id);
        this.showingPostList = this.postList;
      },
      error=>{
        this.err=true;
      });
      }
  
  

}




  