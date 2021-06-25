import {Component, OnInit} from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {ToastController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: Offeror | Applicant;
  postList: Post[] = [];
  err = false;
  lat: number;
  long: number;
  private message: string;

  constructor(private routes: Router, private postService: PostService, public toastController: ToastController,
              private geo: Geolocation, private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
    if (this.user == null) {
      this.routes.navigateByUrl('login');
    } else {
      if((typeof this.user.interestedPostList) == 'undefined'){
        this.user.interestedPostList = [];
      }
      if(this.user.type === 'applicant'){
        if((typeof (this.user as Applicant).candidationList) == 'undefined'){
          (this.user as Applicant).candidationList = [];
        }
      }
      this.postService.getPost(this.user).subscribe(
        response => {
          this.postList = response;
          this.err = false;
        },
        error => {
          this.err = true;
        });
      /*this.geo.getCurrentPosition({
        timeout: 3000,
        enableHighAccuracy: true
      }).then((data) => {
        this.lat = data.coords.latitude;
        this.long = data.coords.longitude;
        sessionStorage.setItem('latitude', String(this.lat));
        sessionStorage.setItem('longitude', String(this.long));
      }).catch((error) => {
        console.log(error);
      });*/
    }
  }


  goToPost(post: Post) {
    this.postService.post = post;
    this.routes.navigateByUrl('postDetails');
  }

  save(post: Post) {
    let includes=false;
    for(let p of this.user.interestedPostList) {
      if(p.id === post.id){
        includes = true;
      }}

    if (!includes) {
      this.userService.updateInterested(this.user, post.id).subscribe(
        response => {
          this.user.interestedPostList.unshift(post);

          this.message = 'Post salvato con successo';
          this.presentToast();
        },
        error => {
          this.message = 'Si è verificato un errore';
          this.presentToast();
        });
    } else {
      this.message = 'Hai già salvato questo post';
      this.presentToast();
    }
  }

  goToComment(item: Post) {
    //TODO: Implementare
  }

  //TODO da verificare
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
