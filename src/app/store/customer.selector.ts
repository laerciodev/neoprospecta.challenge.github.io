import { createSelector } from '@ngrx/store';
import { AppState } from '../models';

export const selectAllCustomers = (state: AppState) => state.customers;

export const getCustomerById = (id: number) => createSelector(
    selectAllCustomers,
    (allCustomers) => {
        if (allCustomers) {
            return allCustomers.find(customer => customer.id === id);
        } else {
            return [];
        }
    }
);
