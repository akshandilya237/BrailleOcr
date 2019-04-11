import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddnewComponent } from './addnew/addnew.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'addnew',
    component: AddnewComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
