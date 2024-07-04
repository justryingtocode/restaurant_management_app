
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FirstLetterPipe } from './pipes/first_letter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';

@NgModule({
  declarations: [
    FirstLetterPipe,
    AddRestaurantComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbPaginationModule,
    MatDialogModule,
    MatSnackBarModule,
    ToastrModule
  ],
  exports: [
    FirstLetterPipe,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbPaginationModule,
    MatSnackBarModule,
    ToastrModule,
    AddRestaurantComponent
  ]
})
export class sharedModule { }

