import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatHubPageRoutingModule } from './chat-hub-routing.module';

import { ChatHubPage } from './chat-hub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatHubPageRoutingModule
  ],
  declarations: [ChatHubPage]
})
export class ChatHubPageModule {}
