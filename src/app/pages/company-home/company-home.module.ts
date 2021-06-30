import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyHomePageRoutingModule } from './company-home-routing.module';

import { CompanyHomePage } from './company-home.page';
import {HomePageModule} from "../home/home.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CompanyHomePageRoutingModule,
        HomePageModule
    ],
  declarations: [CompanyHomePage]
})
export class CompanyHomePageModule {}
