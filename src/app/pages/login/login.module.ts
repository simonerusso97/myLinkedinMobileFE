import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {RegularLoginComponent} from "../../components/regular-login/regular-login.component";
import {CompanyLoginComponent} from "../../components/company-login/company-login.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [LoginPage, RegularLoginComponent, CompanyLoginComponent]
})
export class LoginPageModule {}
