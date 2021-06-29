import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type: string;
  private lat: any;
  private long: any;

  constructor(private routes: Router) {

  }

  ngOnInit() {
    this.type = 'User';

    /*
    if(sessionStorage.getItem('user') != null) {
      this.routes.navigateByUrl('/tabs',{
        replaceUrl : true
      });
    }
*/
  }

}
