import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';

@Component({
  selector: 'app-sign-up-offeror',
  templateUrl: './sign-up-offeror.component.html',
  styleUrls: ['./sign-up-offeror.component.scss'],
})
export class SignUpOfferorComponent implements OnInit {

  offeror: Offeror = {} as Offeror;
  confirmPassword: string;
  constructor() { }

  ngOnInit() {}

  submit() {
    console.log(this.offeror);
  }
}
