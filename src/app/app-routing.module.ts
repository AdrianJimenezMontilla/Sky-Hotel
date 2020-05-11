import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list',
    loadChildren: () => import('./pages/list/list.module')
                          .then( m => m.ListPageModule),
                          ...canActivate(redirectUnauthorizedTo(['login'])) },
    
  { path: 'create-hotel', loadChildren: () => import('./pages/form/form.module') .then( m => m.FormPageModule),
                          ...canActivate(redirectUnauthorizedTo(['login'])) },
  { path: 'edit-hotel/:id', loadChildren: () => import('./pages/form/form.module') .then( m => m.FormPageModule),
                          ...canActivate(redirectUnauthorizedTo(['login'])) },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
                            ...canActivate(redirectUnauthorizedTo(['login']))
    
  },
  


  
  

  ];
  

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
