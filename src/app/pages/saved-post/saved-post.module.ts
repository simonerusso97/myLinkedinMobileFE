import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedPostPageRoutingModule } from './saved-post-routing.module';

import { SavedPostPage } from './saved-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedPostPageRoutingModule
  ],
  declarations: [SavedPostPage]
})
export class SavedPostPageModule {}
