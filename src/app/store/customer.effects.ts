import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { getCustomers, loadCustomers } from './customer.action';
import { Customer } from '../models';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class CustomerEffects {
   loadMovies$: Observable<Action> = createEffect(() => {
       return this.actions$.pipe(
           ofType(getCustomers),
           mergeMap(
               () => this.customerService.getAllCustomers().pipe(
                   map((customers: Customer[]) => {
                       return loadCustomers({ payload: customers });
                   }),
                   catchError(() => EMPTY)
               )
           )
       );
   });

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}
}
