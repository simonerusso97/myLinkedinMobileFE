import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-company-sign-up',
  templateUrl: './company-sign-up.component.html',
  styleUrls: ['./company-sign-up.component.scss'],
})
export class CompanySignUpComponent implements OnInit {
  company: Company = {} as Company;
  confirmPassword: string;
  regError= {
    error: false,
    message: null
  };
  pwdError= {
    error: false,
    message: 'Le password non coincidono'
  };

  submit= false;
  private companySignUpForm: FormGroup;

  private validationMessages = {
    name: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    password: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    sector: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    description: [
      {type: 'required', message: 'Non può essere vuoto'}
    ]
  };


  constructor(private route: Router, private companyService: CompanyService, public formBuilder: FormBuilder) {
    this.companySignUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      sector: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  navigateTo(signup: string) {
    this.route.navigateByUrl(signup, {
      replaceUrl: true
    });
  }

  signup() {
    this.submit = true;
    this.company = this.companySignUpForm.value;

    if (this.company.password !== this.confirmPassword){
      this.pwdError.error = true;
    }
    else if(this.companySignUpForm.valid){
      this.pwdError.error = false;
      this.companyService.companySignUp(this.company).subscribe(
        response => {
          this.route.navigateByUrl('/login',{
            replaceUrl : true
          });
        },
        error => {
          this.regError.error = true;
          this.regError.message = 'Si è verificato un errore' + error;
        });
    }
  }

}
