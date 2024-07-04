import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
// import { ProgramListComponent } from './component/program-list/program-list.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent
  },
  // {
  //   path: 'programs', component: ProgramListComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }