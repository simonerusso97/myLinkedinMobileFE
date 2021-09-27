import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'createPost',
        loadChildren: () => import('../create-post/create-post.module').then(m => m.CreatePostPageModule)
      },
      {
        path: 'chatHub',
        loadChildren: () => import('../chat-hub/chat-hub.module').then(m => m.ChatHubPageModule)
      },
      {
        path: 'savedPost',
        loadChildren: () => import('../saved-post/saved-post.module').then(m => m.SavedPostPageModule)
      },
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
