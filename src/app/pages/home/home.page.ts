/* eslint-disable prefer-const */
import {Component, OnInit} from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {IonSelect, ToastController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {UserService} from '../../services/user.service';
import {Skill} from '../../models/skill';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';

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
  long: number;
  startDate: Date;
  endDate: Date = new Date();
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };

  degreeToRad: number = Math.PI/180;

  private message: string;


  constructor(private routes: Router, private postService: PostService, public toastController: ToastController,
              private userService: UserService, private nativeGeocoder: NativeGeocoder) {
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

          this.postList = response.filter( p => p.hide = true);
          this.postList.sort(/*(p1, p2) => this.comparePost(p1, p2)*/);
          this.showingPostList = response.filter( p => p.hide = true);
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
    }
  }

  comparePost(p1: Post, p2: Post): number{
    let loc1: NativeGeocoderResult[] = [];
    let loc2: NativeGeocoderResult[] = [];
    p1.jsonDocument.forEach(jd => {
      if(jd.nameAttribute==='location'){
        this.nativeGeocoder.forwardGeocode(jd.value, this.options)
          .then((result: NativeGeocoderResult[]) => loc1 = result)
          .catch((error: any) => console.log(error));
      }
    });

    p2.jsonDocument.forEach(jd => {
      if(jd.nameAttribute==='location'){
        this.nativeGeocoder.forwardGeocode(jd.value, this.options)
          .then((result: NativeGeocoderResult[]) => loc2 = result)
          .catch((error: any) => console.log(error));
      }
    });



    let latUser: any = sessionStorage.getItem('latitude');
    let longUser: any =  sessionStorage.getItem('longitude');

    let dLat: any = ((loc1[0].latitude as any) - latUser) * this.degreeToRad;
    let dLong: any = ((loc1[0].longitude as any) - longUser) * this.degreeToRad;

    // eslint-disable-next-line max-len
    let a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(latUser * this.degreeToRad) * Math.cos((loc1[0].latitude as any) * this.degreeToRad) * Math.pow(Math.sin(dLong / 2), 2);
    let c1 = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    dLat = ((loc2[0].latitude as any) - latUser) * this.degreeToRad;
    dLong = ((loc2[0].longitude as any) - longUser) * this.degreeToRad;

    // eslint-disable-next-line max-len
    a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(latUser * this.degreeToRad) * Math.cos((loc1[0].latitude as any) * this.degreeToRad) * Math.pow(Math.sin(dLong / 2), 2);
    let c2 = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    if (c1 > c2) {
      return -1;
    }else if (c1 < c2) {
      return 1;
    }
    return 0;

  }

  goToPost(post: Post) {
    this.postService.post = post;
    this.routes.navigateByUrl('/postDetails',{
      replaceUrl : true
    });    }

  save(post: Post) {
    let includes=false;
    for(const p of this.user.interestedPostList) {
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
    this.showingPostList = this.postList.filter(post => post.pubblicationDate > this.startDate || post.pubblicationDate<this.endDate );
  }

  filter(skillSelect: IonSelect) {
    this.showingPostList = [];
    if (skillSelect.value.length === 0){
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
