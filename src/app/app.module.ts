import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MenuService} from "./services/menu.service";
import {HttpModule} from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
//import { ProductModalComponent } from './components/products/modal.component';
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
    AngularFontAwesomeModule,
    HttpModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
