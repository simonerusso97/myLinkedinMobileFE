import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type: string;

  constructor(private routes: Router) {
    this.type = 'User';
    if(sessionStorage.getItem('user') != null) {
      routes.navigateByUrl('tab');
    }
  }

  ngOnInit() {
  }

}
