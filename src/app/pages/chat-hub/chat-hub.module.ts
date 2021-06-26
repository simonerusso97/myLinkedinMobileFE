import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatHubPageRoutingModule } from './chat-hub-routing.module';

import { ChatHubPage } from './chat-hub.page';
import {HomePageModule} from "../home/home.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatHubPageRoutingModule,
    HomePageModule
  ],
  declarations: [ChatHubPage]
})
export class ChatHubPageModule {}
