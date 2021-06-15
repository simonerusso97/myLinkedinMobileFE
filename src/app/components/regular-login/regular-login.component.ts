import { Component, OnInit } from '@angular/core';
import {Regular} from '../../models/regular';

@Component({
  selector: 'app-regular-login',
  templateUrl: './regular-login.component.html',
  styleUrls: ['./regular-login.component.scss'],
})
export class RegularLoginComponent implements OnInit {
  loginError = false;
  regular: Regular = {} as Regular;

  constructor() { }

  ngOnInit() {}

  onSubmit() {

  }
}
