import {Component, OnInit} from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {Post} from '../../models/post';
import {Company} from '../../models/company';
import {Structure} from '../../models/structure';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user: Offeror | Applicant;
  postList: Post[] = [];
  err = false;

  constructor(private routes: Router, private postService: PostService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('login');
    }
  }

  ngOnInit(): void {
    this.postService.getPost(this.user).subscribe(
      response => {
        this.postList = response;
        this.err = false;
      },
      error => {
        this.err = true;
      });

  }


  goToPost(post: Post) {
    this.postService.post = post;
    this.routes.navigateByUrl('postDetails');
  }
}
