import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyHomePage } from './company-home.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyHomePageRoutingModule {}
