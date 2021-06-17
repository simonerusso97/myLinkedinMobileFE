import { Component, OnInit } from '@angular/core';
import {Regular} from '../../models/regular';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-regular-login',
  templateUrl: './regular-login.component.html',
  styleUrls: ['./regular-login.component.scss'],
})
export class RegularLoginComponent implements OnInit {
  loginError = false;
  disabledError = false;
  bannedError = false;
  regular: Regular = {} as Regular;

  constructor(private userService: UserService, private routes: Router) { }

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
        else{
          sessionStorage.setItem('user', JSON.stringify(response));
          this.routes.navigateByUrl('home');
        }
      },
      error => {
        this.loginError = true;
      });
  }
}