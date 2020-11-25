import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/models';
import { Observable } from 'rxjs';

const URL = 'http://private-92a969-processoseletivo1.apiary-mock.com/customers';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(URL);
  }
}
