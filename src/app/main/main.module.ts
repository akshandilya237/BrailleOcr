import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { AddnewComponent } from './addnew/addnew.component';
// import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [MainComponent, AddnewComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  // providers: [HttpClient]

})
export class MainModule { }
