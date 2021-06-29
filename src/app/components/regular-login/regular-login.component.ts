import { Component, OnInit } from '@angular/core';
import {Regular} from '../../models/regular';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Post} from "../../models/post";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-regular-login',
  templateUrl: './regular-login.component.html',
  styleUrls: ['./regular-login.component.scss'],
})
export class RegularLoginComponent implements OnInit {
  loginError = false;
  disabledError = false;
  bannedError = false;
  adminError = false;
  localizationError = false;
  regular: Regular = {} as Regular;
  private lat: any;
  private long: any;


  constructor(private userService: UserService, private routes: Router, public loadingController: LoadingController,
              private geo: Geolocation) { }

  ngOnInit() {}

  onSubmit() {
    this.userService.login(this.regular).subscribe(
      response => {
        this.loginError = false;
        this.disabledError = false;
        this.bannedError = false;

        if(response.disabled){
          this.disabledError = true;
        }
        else if(response.banned){
          this.bannedError = true;
        }
        else if(response.type === 'admin'){
         this.adminError = true;
        }
        else{
          sessionStorage.setItem('user', JSON.stringify(response));
          this.presentLoading()
        }
      },
      error => {
        this.loginError = true;
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Attendi localizzazione',
    });
    await loading.present();

    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((data) => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      sessionStorage.setItem('latitude', String(this.lat));
      sessionStorage.setItem('longitude', String(this.long));
      loading.dismiss();
      this.routes.navigateByUrl('/tabs',{
        replaceUrl : true
      });

    }).catch((error) => {
      loading.dismiss();
      this.localizationError = true;
      sessionStorage.clear();
      console.log(error);
    });

  }

}
