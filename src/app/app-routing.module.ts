import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landingPage',
    pathMatch: 'full',
  },
  {
    path: 'landingPage',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
