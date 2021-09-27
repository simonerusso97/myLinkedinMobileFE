import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
  ],
  exports: [
    ToolbarComponent
  ],
  declarations: [TabsPage, ToolbarComponent]
})
export class TabsPageModule {}
