import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedPostPageRoutingModule } from './saved-post-routing.module';

import { SavedPostPage } from './saved-post.page';
import {HomePageModule} from "../home/home.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SavedPostPageRoutingModule,
        HomePageModule
    ],
  declarations: [SavedPostPage]
})
export class SavedPostPageModule {}
