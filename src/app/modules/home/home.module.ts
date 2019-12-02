/**
* Apttus Digital Commerce
*
* The home module is the landing page for the ecommerce application. It utilizes the
* product carousel and jumbotron component from the apttus elements library test
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './layout/home.component';
import { ComponentModule } from '../../components/component.module';

import { ProductCarouselModule, JumbotronModule, IconModule } from '@apttus/elements';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentModule,
    JumbotronModule,
    ProductCarouselModule,
    IconModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
