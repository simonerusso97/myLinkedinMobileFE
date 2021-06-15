import { Component, OnInit } from '@angular/core';
import {Applicant} from '../../models/applicant';

@Component({
  selector: 'app-sign-up-applicant',
  templateUrl: './sign-up-applicant.component.html',
  styleUrls: ['./sign-up-applicant.component.scss'],
})
export class SignUpApplicantComponent implements OnInit {

  applicant: Applicant = {} as Applicant;
  confirmPassword: string;

  constructor() { }

  ngOnInit() {}

  onSubmit(){}

}
