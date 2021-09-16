import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyHomePageRoutingModule } from './company-home-routing.module';

import { CompanyHomePage } from './company-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyHomePageRoutingModule
  ],
  declarations: [CompanyHomePage]
})
export class CompanyHomePageModule {}
