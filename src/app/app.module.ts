
//Importing services
import { JsondataService } from './jsondata.service';
import { PageloaderService } from './pageloader.service';
import { PagedetailService } from './pagedetail.service';
import { ScormControlService } from './scorm-control.service';
import { MediasliderService } from './mediaslider.service';
import { AudioControlService } from './audio-control.service';

//Importing nature angular classes
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//Importing components
import { AppComponent } from './app.component';
import { NavcomponentComponent } from './navcomponent/navcomponent.component';
import { HeadercomponentComponent } from './headercomponent/headercomponent.component';

  //Pages Component
  import { Page1Component } from './course/page-1/page-1.component';
  import { Page2Component } from './course/page-2/page-2.component';
  import { Page3Component } from './course/page-3/page-3.component';

//Importing Custom Routes
import { routes } from './app.route'

//Importing Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; 
import { TooltipModule } from 'ngx-bootstrap/tooltip'; 
import { ModalModule } from 'ngx-bootstrap/modal';

//Importing Custom Scrollbar
import { ScrollbarModule  } from 'ngx-scrollbar';

//Imporing SCORM Module
import { ScormWrapperModule } from 'ngx-scorm-wrapper';


@NgModule({
  declarations: [
    AppComponent,
    NavcomponentComponent,
    HeadercomponentComponent,
    Page1Component,
    Page2Component,
    Page3Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ScrollbarModule,
    RouterModule.forRoot(routes),
    ScormWrapperModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [
    PagedetailService, JsondataService, PageloaderService, ScormControlService, MediasliderService, AudioControlService
  ],
  bootstrap: [
    AppComponent,
    NavcomponentComponent,
    HeadercomponentComponent
  ]
})
export class AppModule { }
