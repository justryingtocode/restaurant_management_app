import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantComponent } from './add-restaurant.component';

const routes: Routes = [
  {
    path: "", component: AddRestaurantComponent
  }
];

@NgModule({
  declarations: [AddRestaurantComponent],
  imports: [
    CommonModule,
    sharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AddRestaurantModule { }
