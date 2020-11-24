import { Component } from '@angular/core';
import { Customer } from '../models/models';
@Component({
  selector: 'app-customer-list',
  styleUrls: ['customer-list.component.scss'],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent {

  customers: Customer[] = [];
  constructor() {}

  displayedColumns: string[] = ['id', 'name', 'city', 'age'];
  dataSource = this.customers;
}

