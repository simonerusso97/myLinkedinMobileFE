import { Component, OnInit } from '@angular/core';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormGroup, FormBuilder, Validators, FormControlName, FormControl} from '@angular/forms';

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
  submit = false;

  private applicantSignUpForm: FormGroup;

  private validationMessages = {
    name: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    surname: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    email: [
      {type: 'required', message: 'Non può essere vuoto'},
      {type: 'email', message: 'Deve avere un formato email valido'}
    ],
    birthDate: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    password: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Non può essere vuoto'},
    ],
    address: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    degree: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
  };

  constructor(private route: Router, private userService: UserService, public formBuilder: FormBuilder) {

    this.applicantSignUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.email
        ])),
      birthDate: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.compose(
        [
          Validators.required,
        ])),
      address: new FormControl('', Validators.required),
      degree: new FormControl('', Validators.required),
    });
  }



  ngOnInit() {
    //TODO: controllare sessionstorage di ogni login e signup
  }

  signup() {
    this.submit = true;
    this.pwdError.error = false;
    if (this.applicantSignUpForm.value.password !== this.applicantSignUpForm.value.confirmPassword){
      this.pwdError.error = true;
    }
    else if (this.applicantSignUpForm.valid){
      this.applicant = this.applicantSignUpForm.value;

      console.log(this.applicant);
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
