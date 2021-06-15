import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss'],
})
export class CompanyLoginComponent implements OnInit {
  loginError = false;
  comapny: Company = {} as Company;

  constructor() { }

  ngOnInit() {}

  onSubmit() {

  }
}
