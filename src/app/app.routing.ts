import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProductsComponent} from './components/products/products.component';
import {CustomersComponent} from './components/customers/customers.component';
import {SettingsComponent} from './components/settings/settings.component';
import {RecordsComponent} from './components/records/records.component';

export const routing = RouterModule.forRoot([
    {path: '', component:DashboardComponent},
    {path: 'products', component:ProductsComponent},
    {path: 'customers', component:CustomersComponent},
    {path: 'settings', component:SettingsComponent},
    {path: 'records', component:RecordsComponent},
]);