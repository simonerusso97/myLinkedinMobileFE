import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import {SignUpApplicantComponent} from '../../components/sign-up-applicant/sign-up-applicant.component';
import {SignUpOfferorComponent} from '../../components/sign-up-offeror/sign-up-offeror.component';
import {SignUpCompanyComponent} from '../../components/sign-up-company/sign-up-company.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule
  ],
  exports: [
    SignupPage
  ],
    declarations: [SignupPage, SignUpApplicantComponent, SignUpOfferorComponent, SignUpCompanyComponent]
})
export class SignupPageModule {}
