import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';

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

  constructor(private route: Router, private companyService: CompanyService) { }

  ngOnInit() {}

  navigateTo(signup: string) {
    this.route.navigateByUrl(signup, {
      replaceUrl: true
    });
  }

  signup() {
    if (this.company.password !== this.confirmPassword){
      this.pwdError.error = true;
    }
    else{
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
