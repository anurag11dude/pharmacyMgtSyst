import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';
import { ModalModule, BsDatepickerModule, PopoverModule, AccordionModule } from 'ngx-bootstrap';
/* import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; */
import { routing } from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MenuService} from "./services/menu.service";
import {HttpModule} from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductModalContent } from './components/products/modals.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerModalContent } from './components/customers/modals.component';
import { RecordsComponent } from './components/records/records.component';
import { RecordModalContent } from './components/records/modals.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserModalContent } from './components/settings/modals.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardModalContent } from './components/dashboard/modals.component';
import { ListComponent } from './utilities/list.component';
import { CroppieComponent } from './utilities/croppie.component';
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
    ProductModalContent,
    CustomerModalContent,
    RecordModalContent,
    CroppieComponent,
    UserModalContent,
    DashboardModalContent,
    search
  ],
  imports: [
    BrowserModule,
    routing,
    NgxElectronModule,
    AngularFontAwesomeModule,
    HttpModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    PopoverModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [MenuService],
  bootstrap: [AppComponent],
  entryComponents: [
    ProductModalContent,
    CustomerModalContent,
    RecordModalContent,
    DashboardModalContent,
    UserModalContent
  ]
})
export class AppModule { }
