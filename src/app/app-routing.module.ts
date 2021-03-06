import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'companyHome',
    loadChildren: () => import('./pages/company-home/company-home.module').then( m => m.CompanyHomePageModule)
  },
  {
    path: 'create-post',
    loadChildren: () => import('./pages/create-post/create-post.module').then( m => m.CreatePostPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'chatHub',
    loadChildren: () => import('./pages/chatSystem/chat-hub/chat-hub.module').then(m => m.ChatHubPageModule)
  },
  {
    path: 'savedPost',
    loadChildren: () => import('./pages/saved-post/saved-post.module').then( m => m.SavedPostPageModule)
  },
  {
    path: 'postDetail',
    loadChildren: () => import('./pages/post-detail/post-detail.module').then( m => m.PostDetailPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chatSystem/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./pages/summary/summary.module').then( m => m.SummaryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
