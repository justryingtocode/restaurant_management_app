import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components to be declared

// Form builder

// search select option.
import { SelectDropDownModule } from 'ngx-select-dropdown';

// Api
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from '../app/interceptors/my-interceptor';

// ng-select
import { NgSelectModule } from '@ng-select/ng-select';

// Snackbar
// import { MatSnackbarSeverityModule } from 'mat-snackbar-severity';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationItem } from './layout/navigation/navigation';


import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { NavLogoComponent } from './layout/navigation/nav-logo/nav-logo.component';
import { NavContentComponent } from './layout/navigation/nav-content/nav-content.component';
import { NavItemComponent } from './layout/navigation/nav-content/nav-item/nav-item.component';
import { NavCollapseComponent } from './layout/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './layout/navigation/nav-content/nav-group/nav-group.component';
// import { LayoutRoutingModule } from './layout/layout-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { NavLeftComponent } from './layout/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './layout/nav-bar/nav-right/nav-right.component';
import { AuthGuard } from './auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialog } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent, LayoutComponent, NavContentComponent, NavLogoComponent, NavigationComponent, NavItemComponent, NavCollapseComponent, NavGroupComponent, NavBarComponent, NavLeftComponent, NavRightComponent,ConfirmationDialog
  ],
  imports: [
    BrowserModule,
    // Routing
    AppRoutingModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    NgSelectModule,

    // API
    HttpClientModule,

    // Snackbar
    BrowserAnimationsModule,
    NgScrollbarModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    NavigationItem,
    AuthGuard,
    // API
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
