import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type: string;

  constructor(private route: Router) { }

  ngOnInit() {
    this.type = 'user';
    if(sessionStorage.getItem('user') !== null) {
      this.route.navigateByUrl('/tabs',{
        replaceUrl : true
      });
    }
  }

}
