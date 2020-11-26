import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Customer } from '../models/models';
import { getCustomers } from '../store/customer.action';
@Component({
  selector: 'app-customer-list',
  styleUrls: ['customer-list.component.scss'],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'city', 'age', 'button'];
  filters = this.displayedColumns.slice(0, -1);
  customers$: Observable<Customer[]>;
  customerSubs: Subscription;
  customers: Customer[];
  dataSource: MatTableDataSource<Customer>;
  form: FormGroup;
  filterCategory: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<{ customers: Customer[] }>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.customers$ = store.select('customers');
    this.customerSubs = this.customers$.subscribe(customers => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Customer, filter: string) => {
        const column = this.filterCategory;
        return data[column].toString().toLocaleLowerCase().includes(filter);
      };
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getCustomers());
    this.initForm();
  }

  ngOnDestroy(): void {
    this.customerSubs.unsubscribe();
  }

  initForm(): void {
    this.form = this.fb.group({
      options: ['id'],
      searchTerm: ['']
    });
    this.form.get('options').valueChanges.subscribe(
      option => this.filterCategory = option
    );
    this.form.get('searchTerm').valueChanges.subscribe(
      searchTerm => this.applyFilter(searchTerm)
    );
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCustomer(id: string): void {
    this.router.navigateByUrl(`edit/${id}`);
  }
}

