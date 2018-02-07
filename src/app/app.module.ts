
//Importing services
import { JsondataService } from './jsondata.service';
import { PageloaderService } from './pageloader.service';
import { PagedetailService } from './pagedetail.service';
import { MediaControlService } from './media-control.service';
import { NavigatorControlService } from './navigator-control.service';
import { MenuControlService } from './menu-control.service';
import { GlossaryControlService } from './glossary-control.service';
import { ResourceControlService } from './resource-control.service';
import { SpriteAnimationService } from './sprite-animation.service';
import { BrowserDetectService } from './browser-detect.service';
import { DeviceDetectService } from './device-detect.service';
import { AnimationUtilsService } from './animation-utils.service';

//Importing nature angular classes
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//Importing components
import { AppComponent } from './app.component';
import { NavcomponentComponent } from './navcomponent/navcomponent.component';
import { HeadercomponentComponent } from './headercomponent/headercomponent.component';
import { GadgetButtonsComponent } from './gadget-buttons/gadget-buttons.component';
import { MenuContainerComponent } from './menu-container/menu-container.component';
import { TranscriptContainerComponent } from './transcript-container/transcript-container.component';
import { ClosedCaptionComponent } from './closed-caption/closed-caption.component';
import { GlossaryContainerComponent } from './glossary-container/glossary-container.component';
import { ResourceContainerComponent } from './resource-container/resource-container.component';

  //Pages Component
  import { Page0101Component } from './course/module1/page-01-01/page-01-01.component';
  import { Page0102Component } from './course/module1/page-01-02/page-01-02.component';
  import { Page0103Component } from './course/module1/page-01-03/page-01-03.component';
  import { Page0104Component } from './course/module1/page-01-04/page-01-04.component';
  import { Page0105Component } from './course/module1/page-01-05/page-01-05.component';
  import { Page0106Component } from './course/module1/page-01-06/page-01-06.component';
  import { Page0107Component } from './course/module1/page-01-07/page-01-07.component';
  import { Page0108Component } from './course/module1/page-01-08/page-01-08.component';
  import { Page0109Component } from './course/module1/page-01-09/page-01-09.component';

//Importing Custom Routes
import { routes } from './app.route'

//Importing Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; 
import { TooltipModule } from 'ngx-bootstrap/tooltip'; 
import { ModalModule } from 'ngx-bootstrap/modal';

//Importing Directives
import { DdDragDropAppropriateDirective } from './dd-drag-drop-appropriate.directive';
import { DdDragDropOneToOneDirective } from './dd-drag-drop-one-to-one.directive';
import { DdDragDropType1Directive } from './dd-drag-drop-type1.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavcomponentComponent,
    HeadercomponentComponent,
    GadgetButtonsComponent,
    MenuContainerComponent,
    Page0101Component,
    Page0102Component,
    Page0103Component,
    Page0104Component,
    Page0105Component,
    Page0106Component,
    Page0107Component,
    Page0108Component,
    Page0109Component,
    TranscriptContainerComponent,
    ClosedCaptionComponent,
    GlossaryContainerComponent,
    ResourceContainerComponent,
    DdDragDropType1Directive,
    DdDragDropOneToOneDirective,
    DdDragDropAppropriateDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [
    BsDropdownModule,
    TooltipModule,
    ModalModule
  ],
  providers: [
    PagedetailService,
    JsondataService,
    PageloaderService,
    MediaControlService,
    NavigatorControlService,
    MenuControlService,
    GlossaryControlService,
    ResourceControlService,
    SpriteAnimationService,
    BrowserDetectService,
    DeviceDetectService,
    AnimationUtilsService
  ],
  bootstrap: [
    AppComponent,
    NavcomponentComponent,
    HeadercomponentComponent,
    GadgetButtonsComponent,
    MenuContainerComponent,
    TranscriptContainerComponent,
    ClosedCaptionComponent,
    GlossaryContainerComponent,
    ResourceContainerComponent
  ]
})

export class AppModule { }
