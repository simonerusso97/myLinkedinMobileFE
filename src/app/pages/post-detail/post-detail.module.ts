import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostDetailPageRoutingModule } from './post-detail-routing.module';

import { PostDetailPage } from './post-detail.page';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDetailPageRoutingModule
  ],
  exports: [
    ToolbarComponent
  ],
  declarations: [PostDetailPage, ToolbarComponent]
})
export class PostDetailPageModule {}
