import { Component } from '@angular/core';
import {Offeror} from "../../models/offeror";
import {Applicant} from "../../models/applicant";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: Offeror | Applicant;
  constructor() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

}
