import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  type: any;

  constructor(private routes: Router) {
    this.type = 'Applicant';
    if(sessionStorage.getItem('user') != null) {
      routes.navigateByUrl('tab');
    }
  }
  ngOnInit() {
  }
}
