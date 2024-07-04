import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantDetailComponent } from './restaurant-detail.component';
import { sharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
      path: "", component: RestaurantDetailComponent
  }
];

@NgModule({
  declarations: [RestaurantDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    sharedModule
  ]
})
export class RestaurantDetailModule { }
