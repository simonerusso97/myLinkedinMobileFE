import { Component, OnInit } from '@angular/core';
import {Regular} from '../../models/regular';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
  regular: Regular = {} as Regular;
  lat: number;
  long: number;

  constructor(private userService: UserService, private routes: Router, private geo: Geolocation) { }

  ngOnInit() {}

  onSubmit() {

    this.geo.getCurrentPosition({
      timeout:1000,
      enableHighAccuracy:true
    }).then((data)=>{
        this.lat=data.coords.latitude;
        this.long=data.coords.longitude;
        sessionStorage.setItem('latitude', String(this.lat));
        sessionStorage.setItem('longitude', String(this.long));
      }).catch((error)=>{
      console.log(error);
    });

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
          this.routes.navigateByUrl('tabs');
        }
      },
      error => {
        this.loginError = true;
      });
  }
}
