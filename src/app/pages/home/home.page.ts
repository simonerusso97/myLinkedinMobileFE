import {Component, OnInit} from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {IonSelect, ToastController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {UserService} from '../../services/user.service';
import {Skill} from "../../models/skill";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: Offeror | Applicant;
  postList: Post[] = [];
  showingPostList: Post[] = [];
  skillList: Skill[] = [];
  err = false;
  lat: number;
  long: number;x
  private message: string;
  startDate: Date;
  endDate: Date = new Date();

  constructor(private routes: Router, private postService: PostService, public toastController: ToastController,
              private geo: Geolocation, private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
    if (this.user == null) {
      this.routes.navigateByUrl('/login',{
        replaceUrl : true
      });      } else {
      if((typeof this.user.interestedPostList) == 'undefined'){
        this.user.interestedPostList = [];
      }
      this.postService.getPost(this.user).subscribe(
        response => {
          this.postList = response;
          this.showingPostList = response;
          this.err = false;
        },
        error => {
          this.message = 'Si è verificato un errore';
          this.presentToast();
        });
      this.postService.findAllSkill().subscribe(
        response => {
          this.skillList = response;
        },
        error => {
          this.message = 'Si è verificato un errore';
          this.presentToast();
        }
      );
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
    this.routes.navigateByUrl('/postDetails',{
      replaceUrl : true
    });    }

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
          sessionStorage.setItem('user', JSON.stringify(this.user));
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== ''){
      this.showingPostList = this.postList.filter(post =>
        (post.createdBy.name +' '+ post.createdBy.surname).toUpperCase().includes(val.toUpperCase())
      );
    }
    else{
      this.showingPostList = this.postList;
    }
  }


  fiterByDate() {
    this.showingPostList = this.postList.filter(post => post.pubblicationDate > this.startDate || post.pubblicationDate<this.endDate )
  }

  filter(skillSelect: IonSelect) {
    this.showingPostList = [];
    if (skillSelect.value.length == 0){
      this.showingPostList = this.postList;
    }
    else {
      skillSelect.value.forEach(
        v => {
          this.postList.forEach( post => {
            post.skillList.forEach( s => {
              if(s.name === v.name && !this.showingPostList.includes(post)){
                this.showingPostList.unshift(post);
              }
            });
          });
        }
      );
    }
  }
}
