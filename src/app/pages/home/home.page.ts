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
  post: Post = {} as Post;
  post2: Post = {} as Post;
  post3: Post = {} as Post;

  postList: Post[] = [];

  company: Company = {} as Company;
  structure: Structure = {} as Structure;
  constructor(private routes: Router, private postService: PostService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('login');
    }
  }

  ngOnInit(): void {
    this.company = {
      description: 'prova',
      id: 0,
      name: 'azienda prova',
      pwd: '1234',
      sector: 'IT'

    };
    this.structure = {
      description: 'strutture prova',
      id: 0,
      name: 'struttura prova',
      userType: 'offeror'

    };
    this.post = {
      company: this.company,
      createdBy: this.user,
      hide: false,
      id: 0,
      name: 'Post di prova 1',
      pubblicationDate: new Date('2020-06-15'),
      report: 0,
      structure: this.structure
    };
    this.post2 = {
      company: this.company,
      createdBy: this.user,
      hide: false,
      id: 0,
      name: 'Post di prova 2',
      pubblicationDate: new Date('2020-06-15'),
      report: 0,
      structure: this.structure
    };
    this.post3 = {
      company: this.company,
      createdBy: this.user,
      hide: false,
      id: 0,
      name: 'Post di prova 3',
      pubblicationDate: new Date('2020-06-15'),
      report: 0,
      structure: this.structure
    };
    this.postList.unshift(this.post);
    this.postList.unshift(this.post2);
    this.postList.unshift(this.post3);
    this.postList.unshift(this.post);


  }


  goToPost(post: Post) {
    this.postService.post = post;
    this.routes.navigateByUrl('postDetails');
  }
}
