import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private type: string;

  constructor(private routes: Router) { }

  ngOnInit() {
    this.type = 'applicant';
    if(sessionStorage.getItem('user') !== null) {
      this.routes.navigateByUrl('/tabs',{
        replaceUrl : true
      });
    }

  }

}
