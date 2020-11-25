import { createAction, props } from '@ngrx/store';
import { Customer } from '../models/models';

export const getCustomers = createAction('[Customer] Get customers');
export const loadCustomers = createAction('[Customer] Load customers', props<{ payload: Customer[] }>());
