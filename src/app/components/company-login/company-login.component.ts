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
  comapny: Company = {} as Company;

  private companyLoginForm: FormGroup;

  private validationMessages = {
    name: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    password: [
      {type: 'required', message: 'Non può essere vuoto'}
    ]
  };

  constructor(private route: Router, private companyService: CompanyService, public formBuilder: FormBuilder) {
    this.companyLoginForm = new FormGroup({
      email: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.email
        ])),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  login() {
    this.submit = true;
    this.comapny = this.companyLoginForm.value;
    if(this.companyLoginForm.valid) {
      this.companyService.login(this.comapny).subscribe(
        response => {
          this.loginError.error = false;
          sessionStorage.setItem('company', JSON.stringify(response));
          /*this.route.navigateByUrl('/tabs',{
            replaceUrl : true
          });*/
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
