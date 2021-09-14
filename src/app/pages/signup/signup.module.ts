import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import {ApplicantSignUpComponent} from "../../components/applicant-sign-up/applicant-sign-up.component";
import {OfferorSignUpComponent} from "../../components/offeror-sign-up/offeror-sign-up.component";
import {CompanySignUpComponent} from "../../components/company-sign-up/company-sign-up.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage, ApplicantSignUpComponent, OfferorSignUpComponent, CompanySignUpComponent]
})
export class SignupPageModule {}
