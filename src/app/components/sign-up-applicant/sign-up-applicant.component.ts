import { Component, OnInit } from '@angular/core';
import {Applicant} from '../../models/applicant';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up-applicant',
  templateUrl: './sign-up-applicant.component.html',
  styleUrls: ['./sign-up-applicant.component.scss'],
})
export class SignUpApplicantComponent implements OnInit {

  applicant: Applicant = {} as Applicant;
  confirmPassword: string;
  pwdError = false;
  regError = false;

  constructor(private userService: UserService, private routes: Router) { }

  ngOnInit() {}

  onSubmit(){
    if (this.applicant.password !== this.confirmPassword){
      this.pwdError = true;
    }
    else{
      this.pwdError = false;
      this.applicant.banned=false;
      this.applicant.disabled=false;
      this.userService.createApplicant(this.applicant).subscribe(
        response => {
          this.routes.navigateByUrl('tabs');
        },
        error => {
          this.regError = true;
        });
    }

  }

}
