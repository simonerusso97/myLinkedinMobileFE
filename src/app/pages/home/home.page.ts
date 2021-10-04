// noinspection NonAsciiCharacters,JSNonASCIINames

import {Component, OnInit} from '@angular/core';
import {IonSelect, ToastController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {Coordinates} from '@ionic-native/geolocation';
import {Skill} from '../../models/skill';
import {Regular} from '../../models/regular';
import {UserService} from '../../services/user.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder';


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
  interestedPostList: Post[] = [];
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  private message: string;

  constructor(private route: Router, private postService: PostService, public toastController: ToastController,
              private userService: UserService, private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
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
          let pList1: Post[] = []; //Senza indirizzo fisico
          let pList2: Post[] = []; //Con indirizzo fisico

          response.forEach(
            post => {
              let added = false;
              post.jsonDocument?.forEach(
                jd => {
                  if (jd.nameAttribute === 'indirizzo web') {
                    pList1.push(post);
                    added = true;
                  }
                  else if(jd.nameAttribute === 'indirizzo web o fisico'){
                    this.nativeGeocoder.forwardGeocode(jd.value as string, this.options)
                      .then(() => pList2.push(post))
                      .catch(() => pList1.push(post));
                    added = true;
                  }
                  else if(jd.nameAttribute === 'indirizzo') {
                    pList2.push(post);
                    added = true;
                  }
              });
              if(!added){
                pList1.push(post);
              }
            }
          );

          this.postList = pList2.sort((p1: Post, p2: Post) => this.comparePost(p1, p2));
          pList1.forEach(
            post => {
              this.postList.push(post);
            }
          );
          this.showingPostList = this.postList;
        },
        error => {
          this.message = 'Si è verificato un errore' + error.error.message;
          this.presentToast();
        }
      );
      this.userService.findAllInterestedPost(this.user).subscribe(
        response => {
          this.interestedPostList = [];
          this.interestedPostList = response;
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
      post => post.pubblicationDate.getTime() > this.startDate.getTime() && post.pubblicationDate.getTime() < this.endDate.getTime());
  }

  goToPost(post: Post) {
    const navigationExtras: NavigationExtras = {
      state: {
        post,
      },
      replaceUrl: true
    };
    this.route.navigateByUrl('/postDetail', navigationExtras);

  }

  save(post: Post) {
    this.interestedPostList.unshift(post);
    this.userService.updateInterested(this.user, this.interestedPostList).subscribe(
      () => {
        this.message = 'Post salvato con successo';
        this.presentToast();
      },
      error => {
        this.message = 'Si è verificato un errore' + error.error.message;
        this.presentToast();
        const index = this.interestedPostList.indexOf(post, 0);
        if (index > -1) {
          this.interestedPostList.splice(index, 1);
        }
      }
    );
  }

  delete(post: Post) {
    let index = -1;
    let cont = 0;
    this.interestedPostList.forEach(
      p =>{
        if (p.id === post.id){
          index = cont;
        }
        cont++;
      }
    );
    if (index > -1) {
      this.interestedPostList.splice(index, 1);
      this.userService.updateInterested(this.user, this.interestedPostList).subscribe(
        () => {
          this.message = 'Salvato eliminato correttamente';
          this.presentToast();
        },
        error => {
          this.message = 'Si è verificato un errore' + error.error.message;
          this.presentToast();
          this.interestedPostList.unshift(post);
        }
      );
    }
    else{
      this.message = 'Si è verificato un errore';
      this.presentToast();
      this.interestedPostList.unshift(post);
    }


  }

  includes(post: Post): boolean {
    let found = false;
    this.interestedPostList.forEach(
      p => {
        if(p.id === post.id){
          found = true;
        }
      }
    );
    return found;
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


     // in metres
    return R * c;

  }

  private comparePost(p1: Post, p2: Post) {
    let p1Value;
    let p2Value;
    p1.jsonDocument.forEach(jd => {
      if (jd.nameAttribute === 'indirizzo' || jd.nameAttribute ==='indirizzo web o fisico') {
        p1Value = this.calculateDistance(this.coordinate, jd.value);
      }
    });

    p2.jsonDocument.forEach(jd => {
      if (jd.nameAttribute === 'indirizzo' || jd.nameAttribute ==='indirizzo web o fisico') {
        p2Value = this.calculateDistance(this.coordinate, jd.value);
      }
    });

    return p1Value - p2Value;
  }


}
