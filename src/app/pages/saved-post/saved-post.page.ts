import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Applicant } from 'src/app/models/applicant';
import { Offeror } from 'src/app/models/offeror';
import { PostService } from 'src/app/services/post.service';
import {Post} from '../../models/post';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-saved-post',
  templateUrl: './saved-post.page.html',
  styleUrls: ['./saved-post.page.scss'],
})
export class SavedPostPage implements OnInit {

  post: Post = {} as Post;
  postList: Post[] = [];
  showingPostList: Post[] = [];
  user: Offeror | Applicant;
  err = false;
  private message: string;

  constructor(private routes: Router, private postService: PostService, public toastController: ToastController,
              private userService: UserService) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));

    if (this.user == null) {
      this.routes.navigateByUrl('login');
    } else {
      if ((typeof this.user.interestedPostList) == 'undefined') {
        this.user.interestedPostList = [];
      }
      if (this.user.type === 'applicant') {
        if ((typeof (this.user as Applicant).candidationList) == 'undefined') {
          (this.user as Applicant).candidationList = [];
        }
      }
      this.postList = this.user.interestedPostList;
    }

  }

  unsavePost(post: Post): void {
    this.user.interestedPostList.filter(item => item.id !== post.id);

    this.userService.unsavePost(this.user, post.id).subscribe(
      response => {
        this.postList = this.postList.filter(data => data.id !== post.id);
        this.showingPostList = this.postList;
      },
      error => {
        this.err = true;
      });
  }

  //TODO: da verificare
  candidate(post: Post) {
    this.user = this.user as Applicant;
    if (!this.user.candidationList.includes(post)) {
      this.user.candidationList.unshift(post);
      this.userService.updateCandidation(this.user, post.id).subscribe(
        response => {
          this.message = 'Candidatura inviate con successo';
          this.presentToast();
        },
        error => {
          this.message = 'Si è verificato un errore';
          this.presentToast();
        });
    } else {
      this.message = 'Hai già inviato la tua candidatura a questo post';
      this.presentToast();
    }
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }
}




