import { Component, OnInit } from '@angular/core';
import {Applicant} from '../../models/applicant';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sign-up-applicant',
  templateUrl: './sign-up-applicant.component.html',
  styleUrls: ['./sign-up-applicant.component.scss'],
})
export class SignUpApplicantComponent implements OnInit {

  applicant: Applicant = {} as Applicant;
  confirmPassword: string;
  pwdError = false;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  onSubmit(){
    if (this.applicant.password !== this.confirmPassword){
      this.pwdError = true;
    }
    else{
      this.pwdError = false;
      this.userService.createApplicant(this.applicant).subscribe();

    }

  }

}
