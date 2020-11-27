import { ParamMap } from '@angular/router';

export interface Customer {
    id: number;
    name: string;
    city: string;
    age: number;
}

export interface AppState {
    customers: Customer[];
}
