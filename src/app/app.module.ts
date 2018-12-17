import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { routing } from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RecordsComponent } from './components/records/records.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './utilities/list.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    RecordsComponent,
    SettingsComponent,
    DashboardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    routing,
    NgxElectronModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
