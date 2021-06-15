import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.scss'],
})
export class SignUpCompanyComponent implements OnInit {
  company: Company = {} as Company;
  confirmPassword: string;
  pwdError = false;
  constructor(private companyService: CompanyService) { }

  ngOnInit() {}

  submit() {
    if (this.company.password !== this.confirmPassword){
      this.pwdError = true;
    }
    else{
      this.pwdError = false;
      this.companyService.createCompany(this.company).subscribe();

    }
  }
}
