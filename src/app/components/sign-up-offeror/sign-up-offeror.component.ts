import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Company} from '../../models/company';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up-offeror',
  templateUrl: './sign-up-offeror.component.html',
  styleUrls: ['./sign-up-offeror.component.scss'],
})
export class SignUpOfferorComponent implements OnInit {

  offeror: Offeror = {} as Offeror;
  confirmPassword: string;
  pwdError = false;
  regError = false;
  constructor(private userService: UserService, private routes: Router) {
    this.offeror.company = {} as Company;
  }

  ngOnInit() {}

  submit() {
    if (this.offeror.password !== this.confirmPassword){
      this.pwdError = true;
    }
    else{
      this.pwdError = false;
      this.userService.createOfferor(this.offeror).subscribe(
        response => {
          this.routes.navigateByUrl('login');
        },
        error => {
          this.regError = true;
        });

    }
  }
}
