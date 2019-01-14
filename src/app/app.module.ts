import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MenuService} from "./services/menu.service";
import {ModalService} from "./services/modal.service";
import {HttpModule} from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { ProductsComponent, NgbdModalContent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RecordsComponent } from './components/records/records.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './utilities/list.component';
import { search } from './utilities/customPipes';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    RecordsComponent,
    SettingsComponent,
    DashboardComponent,
    ListComponent,
    NgbdModalContent,
    search
  ],
  imports: [
    BrowserModule,
    routing,
    NgxElectronModule,
    AngularFontAwesomeModule,
    HttpModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule
  ],
  providers: [MenuService, ModalService],
  bootstrap: [AppComponent],
  entryComponents: [
    NgbdModalContent
  ]
})
export class AppModule { }
