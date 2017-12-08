import { JsondataService } from './jsondata.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavcomponentComponent } from './navcomponent/navcomponent.component';
import { HeadercomponentComponent } from './headercomponent/headercomponent.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavcomponentComponent,
    HeadercomponentComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    JsondataService
  ],
  bootstrap: [
    AppComponent,
    NavcomponentComponent,
    HeadercomponentComponent,
    PagesComponent
  ]
})
export class AppModule { }
