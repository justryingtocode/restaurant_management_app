import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // {
  //   path: "flowchart",
  //   loadChildren: () => import('./flowchart/flowchart.module').then(m => m.FlowchartModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'restaurant-list',
        loadChildren: () => import('./restaurant-listing/restaurant-listing.module').then(m => m.RestaurantListingModule)
      },
      {
        path: 'restaurant-detail/:id',
        loadChildren: () => import('./restaurant-detail/restaurant-detail.module').then(m => m.RestaurantDetailModule)
      },
    ]
  },
  {
    path: "login",
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
    {
    path: "**",
    redirectTo: "",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
