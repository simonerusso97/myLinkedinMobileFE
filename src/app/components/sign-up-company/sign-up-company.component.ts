import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {CompanyService} from "../../services/company.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.scss'],
})
export class SignUpCompanyComponent implements OnInit {
  company: Company = {} as Company;
  confirmPassword: string;
  pwdError = false;
  regError = false;
  constructor(private companyService: CompanyService, private routes: Router) { }

  ngOnInit() {}

  submit() {
    if (this.company.pwd !== this.confirmPassword){
      this.pwdError = true;
    }
    else{
      this.pwdError = false;
      this.companyService.createCompany(this.company).subscribe(
        response => {
          this.routes.navigateByUrl('login');
        },
        error => {
          this.regError = true;
        });

    }
  }
}
