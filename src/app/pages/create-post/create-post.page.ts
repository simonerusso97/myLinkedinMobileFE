import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  user: Offeror | Applicant;

  constructor(private routes: Router, private postService: PostService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('login');
    }
  }

  ngOnInit() {
  }

}
