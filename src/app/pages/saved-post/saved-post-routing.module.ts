import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedPostPage } from './saved-post.page';

const routes: Routes = [
  {
    path: '',
    component: SavedPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedPostPageRoutingModule {}
