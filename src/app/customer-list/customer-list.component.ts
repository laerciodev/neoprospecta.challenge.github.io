import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from '../models/models';
import { getCustomers } from '../actions/customer.action';
@Component({
  selector: 'app-customer-list',
  styleUrls: ['customer-list.component.scss'],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Customer[]>;

  constructor(private store: Store<{ customers: Customer[] }>) {
    this.customers$ = store.select('customers');
  }

  ngOnInit(): void {
    this.store.dispatch(getCustomers());
  }

  displayedColumns: string[] = ['id', 'name', 'city', 'age', 'star'];
}

