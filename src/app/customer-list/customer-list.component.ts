import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Customer } from '../models';
import { getCustomers } from '../store/customer.action';
@UntilDestroy()
@Component({
  selector: 'app-customer-list',
  styleUrls: ['customer-list.component.scss'],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  filters = [
    { label: 'id', value: 'id' },
    { label: 'nome', value: 'name' },
    { label: 'cidade', value: 'city' },
    { label: 'idade', value: 'age' },
  ];
  displayedColumns: string[];
  customers$: Observable<Customer[]>;
  customerSubs: Subscription;
  customers: Customer[];
  dataSource: MatTableDataSource<Customer>;
  form: FormGroup;
  filterCategory = 'id';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<{ customers: Customer[] }>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.customers$ = store.select('customers');
    this.customers$.pipe(untilDestroyed(this)).subscribe(customers => {
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
    this.displayedColumns = this.filters.map(category => {
      if (typeof category.value === 'string') {
        return category.value;
      }
    });
    this.displayedColumns.push('edit');
    this.store.dispatch(getCustomers());
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      options: ['id'],
      searchTerm: ['']
    });
    this.formOptions.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        option => this.filterCategory = option
    );
    this.formSearchTerm.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(
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

  get formOptions(): AbstractControl {
    return this.form.get('options');
  }

  get formSearchTerm(): AbstractControl {
    return this.form.get('searchTerm');
  }
}

