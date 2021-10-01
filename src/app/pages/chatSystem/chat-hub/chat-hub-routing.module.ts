import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatHubPage } from './chat-hub.page';

const routes: Routes = [
  {
    path: '',
    component: ChatHubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatHubPageRoutingModule {}
