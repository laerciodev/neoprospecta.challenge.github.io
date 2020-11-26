import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take, pluck, takeWhile, map } from 'rxjs/operators';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/models';
import { getCustomers } from '../store/customer.action';
import { getCustomerById } from '../store/customer.selector';
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit, OnDestroy {

  idCustomer: number;
  customer: Customer;
  form: FormGroup;
  storeSubs: Subscription;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private store: Store<{ customers: Customer[] }>,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id'),
      takeWhile(id => id !== undefined),
      map(id => parseInt(id, 10)),
    ).subscribe(
      id => {
        this.idCustomer = id;
        this.storeSubs = this.store.select(getCustomerById(this.idCustomer))
          .subscribe(
          (customer: Customer) => {
            if (customer) {
              this.customer = customer;
            } else {
              this.store.dispatch(getCustomers());
            }
          }
      );
    });
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({});
  }

  ngOnDestroy(): void {
    this.storeSubs.unsubscribe();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  save(): void {
    this.customerService.saveCustomer(this.idCustomer, this.customer)
      .pipe(
        pluck('status'),
        take(1)
    ).subscribe(() => {
      this.navToCustomerList();
      this.openSnackBar(`Client ${this.customer.name} atualizado com sucesso.`, 'Fechar');
    });
  }

  cancel(): void {
    this.navToCustomerList();
  }

  navToCustomerList(): void {
    this.router.navigate(['']);
  }

}
