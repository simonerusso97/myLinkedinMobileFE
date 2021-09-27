import { Component, OnInit } from '@angular/core';
import {IonSelect, ToastController} from '@ionic/angular';
import {User} from '../../models/user';
import {NavigationExtras, Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {Coordinates} from '@ionic-native/geolocation';
import {Skill} from '../../models/skill';
import {Regular} from '../../models/regular';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  skillList: Skill[] = [];
  startDate: Date;
  endDate: Date = new Date();
  showingPostList: any;
  postList: Post[] = [];
  user: Regular = {} as Regular;
  coordinate: Coordinates;
  private message: string;

  constructor(private route: Router, private postService: PostService, public toastController: ToastController,
              private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ionViewDidEnter() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
    if (this.user == null) {
      this.route.navigateByUrl('/login', {
        replaceUrl: true
      });
    }
    else {
      this.coordinate = JSON.parse(sessionStorage.getItem('coordinates'));
      this.postService.findAllSkill().subscribe(
        response => {
          this.skillList = response;
        },
        error => {
          this.message = 'Si è verificato un errore' + error.error.message;
          this.presentToast();
        }
      );
      this.postService.findAllPostByUserType(this.user.type).subscribe(
        response => {
          // TODO: this.postList = response.sort((p1: Post, p2: Post) => this.comparePost(p1, p2));
          this.postList = response;
          this.showingPostList = this.postList;
        },
        error => {
          this.message = 'Si è verificato un errore' + error.error.message;
          this.presentToast();
        }
      );
    }
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  getItems(event: any) {
    const val = event.target.value;
    if (val && val.trim() !== ''){
      this.showingPostList = this.showingPostList.filter(post =>
        (post.createdBy.name +' '+ post.createdBy.surname).toUpperCase().includes(val.toUpperCase())
      );
    }
    else{
      this.showingPostList = this.postList;
    }
  }

  filter(skillSelect: IonSelect) {
    this.showingPostList = [];
    if(skillSelect.value.length === 0){
      this.showingPostList = this.postList;
    }
    else{
      skillSelect.value.forEach(
        skill => {
          this.postList.forEach( post => {
            if(post.skillList.includes(skill) && !this.showingPostList.includes(post)){
              this.showingPostList.unshift(post);
            }
          });
        }
      );
    }
  }

  fiterByDate() {
    this.showingPostList = this.showingPostList.filter(
      post => post.pubblicationDate > this.startDate || post.pubblicationDate<this.endDate
    );
  }

  goToPost(post: Post) {
    const navigationExtras: NavigationExtras = {
      state: {
        post,
      }
    };
    this.route.navigateByUrl('/postDetail', navigationExtras);
  }

  save(post: Post) {
    this.user.interestedPostList.unshift(post);
    this.userService.updateInterested(this.user).subscribe(
      response => {
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.message = 'Post salvato con successo';
        this.presentToast();
      },
      error => {
        this.message = 'Si è verificato un errore' + error.error.message;
        this.presentToast();
        const index = this.user.interestedPostList.indexOf(post, 0);
        if (index > -1) {
          this.user.interestedPostList.splice(index, 1);
        }
      }
    );
  }

  delete(post: Post) {
    const index = this.user.interestedPostList.indexOf(post, 0);
    if (index > -1) {
      this.user.interestedPostList.splice(index, 1);
    }
    this.userService.updateInterested(this.user).subscribe(
      response => {
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.message = 'Salvato eliminato correttamente';
        this.presentToast();
      },
      error => {
        this.message = 'Si è verificato un errore' + error.error.message;
        this.presentToast();
        this.user.interestedPostList.unshift(post);
      }
    );
  }

  private calculateDistance(coordUser: Coordinates, coordPost: Coordinates): number{
    const R = 6371e3; // metres
    // φ, λ in radians
    const φ1 = coordUser.latitude * Math.PI/180; //lat1
    const φ2 = coordPost.latitude * Math.PI/180; //lat2
    const dφ = (coordPost.latitude-coordUser.latitude) * Math.PI/180; //lat2 - lat1
    const dλ = (coordPost.longitude-coordUser.longitude) * Math.PI/180; //lon2 - lon1

    const a = Math.sin(dφ/2) * Math.sin(dφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(dλ/2) * Math.sin(dλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;

  }

  private comparePost(p1: Post, p2: Post) {
    let p1Value;
    let p2Value;
    p1.jsonDocument.forEach(jd => {
      if (jd.nameAttribute === 'location') {
        p1Value = this.calculateDistance(this.coordinate, jd.value);
      }
    });

    p2.jsonDocument.forEach(jd => {
      if (jd.nameAttribute === 'location') {
        p2Value = this.calculateDistance(this.coordinate, jd.value);
      }
    });

    return p1Value - p2Value;
  }



}
