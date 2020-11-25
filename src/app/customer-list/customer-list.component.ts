import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Customer } from '../models/models';
import { getCustomers } from '../actions/customer.action';
@Component({
  selector: 'app-customer-list',
  styleUrls: ['customer-list.component.scss'],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'city', 'age', 'button'];
  customers$: Observable<Customer[]>;
  customerSubs: Subscription;
  customers: Customer[];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<{ customers: Customer[] }>) {
    this.customers$ = store.select('customers');
    this.customerSubs = this.customers$.subscribe(customers => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getCustomers());
  }

  ngOnDestroy(): void {
    this.customerSubs.unsubscribe();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

