import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Geolocation} from "@ionic-native/geolocation/ngx";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type: string;
  private lat: any;
  private long: any;

  constructor(private routes: Router, private geo: Geolocation) {

  }

  ngOnInit() {
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((data) => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      sessionStorage.setItem('latitude', String(this.lat));
      sessionStorage.setItem('longitude', String(this.long));
    }).catch((error) => {
      console.log(error);
    });
    this.type = 'User';
    if(sessionStorage.getItem('user') != null) {
      this.routes.navigateByUrl('/tabs',{
        replaceUrl : true
      });
    }

  }

}
