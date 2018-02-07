import { Component, AfterContentInit } from '@angular/core';
import { PageloaderService } from '../../../pageloader.service';
@Component({
  selector: 'app-page-01-02',
  templateUrl: './page-01-02.component.html',
  styleUrls: ['./page-01-02.component.css']
})
export class Page0102Component implements AfterContentInit {
  viewMode ='flood';
  constructor( private loaderService: PageloaderService) { }

  ngAfterContentInit(){
    this.loaderService.showHideLoaderAnim(false);
  }
}