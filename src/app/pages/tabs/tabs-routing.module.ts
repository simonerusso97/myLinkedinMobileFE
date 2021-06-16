import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children:[
          {
            path: '',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'savedPost',
        children:[
          {
            path: '',
            loadChildren: () => import('../saved-post/saved-post.module').then( m => m.SavedPostPageModule)
          }
        ]
      },
      {
        path: 'chat',
        children:[
          {
            path: '',
            loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
          }
        ]
      },
      {
        path: 'createPost',
        children:[
          {
            path: '',
            loadChildren: () => import('../create-post/create-post.module').then( m => m.CreatePostPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class TabsPageRoutingModule {}
