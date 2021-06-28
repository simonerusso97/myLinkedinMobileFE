import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {CompanyService} from '../../services/company.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss'],
})
export class CompanyLoginComponent implements OnInit {
  loginError = false;
  comapny: Company = {} as Company;

  constructor(private companService: CompanyService, private routes: Router) { }

  ngOnInit() {}

  onSubmit() {
    this.companService.login(this.comapny).subscribe(
      response => {
        this.loginError = false;
        sessionStorage.setItem('company', JSON.stringify(response));
        this.routes.navigateByUrl('/tabs',{
          replaceUrl : true
        });
      },
    error => {
        this.loginError = true;
    });

  }
}
