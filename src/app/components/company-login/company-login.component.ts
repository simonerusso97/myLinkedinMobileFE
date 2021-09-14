import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {Router} from '@angular/router';
import {CompanyService} from "../../services/company.service";

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

  comapny: Company = {} as Company;

  constructor(private route: Router, private companyService: CompanyService) { }

  ngOnInit() {}

  login() {
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

  navigateTo(signup: string) {
    this.route.navigateByUrl(signup, {
      replaceUrl: true
    });
  }
}
