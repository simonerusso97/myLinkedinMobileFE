import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss'],
})
export class CompanyLoginComponent implements OnInit {
  loginError = {
    error: false,
    message: null
  };

  submit = false;
  company: Company = {} as Company;

  companyLoginForm: FormGroup;

  validationMessages = {
    name: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    password: [
      {type: 'required', message: 'Non può essere vuoto'}
    ]
  };

  constructor(private route: Router, private companyService: CompanyService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.companyLoginForm = new FormGroup({
      name: new FormControl('', Validators.compose(
        [
          Validators.required
        ])),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.submit = true;
    this.company = this.companyLoginForm.value;
    console.log(this.company);
    if(this.companyLoginForm.valid) {
      this.companyService.login(this.company).subscribe(
        response => {
          this.loginError.error = false;
          sessionStorage.setItem('company', JSON.stringify(response));
          this.route.navigateByUrl('/companyHome',{
            replaceUrl : true
          });
        },
        error => {
          this.loginError.error = true;
          console.log(error);
          this.loginError.message = 'Email o password errati: \n' + error;
        });
    }

  }

  navigateTo(signup: string) {
    this.route.navigateByUrl(signup, {
      replaceUrl: true
    });
  }
}
