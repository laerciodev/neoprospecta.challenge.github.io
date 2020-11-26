import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { CustomerEffects } from './store/customer.effects';
import { customersReducer } from './store/customer.reducer';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomPaginator } from './custom-paginator/custom-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      customers: customersReducer
    }, {}),
    EffectsModule.forRoot([
      CustomerEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
