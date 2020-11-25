import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { CustomerEffects } from '../app/effects/customer.effects';
import { customersReducer } from '../app/reducers/customer.reducer';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomPaginator } from './custom-paginator/custom-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({
      customers: customersReducer
    }, {}),
    EffectsModule.forRoot([
      CustomerEffects
    ])
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
