import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models';
import { Observable } from 'rxjs';

const GET_URL = 'http://private-92a969-processoseletivo1.apiary-mock.com/customers';
const POST_URL = 'https://private-92a969-processoseletivo1.apiary-mock.com/customers/';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(GET_URL);
  }

  public saveCustomer(id: number, customer: Customer): Observable<Status> {
    const url = POST_URL + id;
    return this.http.put<Status>(url, customer);
  }
}

interface Status {
  status: string;
}
