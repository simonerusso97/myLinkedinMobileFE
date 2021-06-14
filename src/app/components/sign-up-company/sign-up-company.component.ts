import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';

@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.scss'],
})
export class SignUpCompanyComponent implements OnInit {
  company: Company = {} as Company;
  confirmPassword: string;
  constructor() { }

  ngOnInit() {}

}
