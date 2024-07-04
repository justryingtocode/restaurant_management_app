import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListingComponent } from './restaurant-listing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: "",
    component: RestaurantListingComponent
  },
]
@NgModule({
  declarations: [RestaurantListingComponent],
  imports: [
    CommonModule,
    sharedModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class RestaurantListingModule { }
