import { Component, OnInit } from '@angular/core';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-applicant-sign-up',
  templateUrl: './applicant-sign-up.component.html',
  styleUrls: ['./applicant-sign-up.component.scss'],
})
export class ApplicantSignUpComponent implements OnInit {
  regError= {
    error: false,
    message: null
  };
  pwdError= {
    error: false,
    message: 'Le password non coincidono'
  };

  applicant: Applicant = {} as Applicant;
  confirmPassword: string;

  constructor(private route: Router, private userService: UserService) {

  }

  ngOnInit() {
    //TODO: controllare sessionstorage di ogni login e signup
  }

  signup() {

    if (this.applicant.password !== this.confirmPassword){
      this.pwdError.error = true;
    }
    else{
      this.pwdError.error = false;
      this.userService.applicatSignUp(this.applicant).subscribe(
        response => {
          this.route.navigateByUrl('/login',{
            replaceUrl : true
          });
        },
        error => {
          this.regError.error = true;
          this.regError.message = 'Si è verificato un errore: \n' + error;
        });
    }
  }

  navigateTo(signup: string) {
    this.route.navigateByUrl(signup, {
      replaceUrl: true
    });
  }
}
