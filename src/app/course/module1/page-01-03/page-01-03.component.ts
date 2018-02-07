import { Component, OnInit, AfterContentInit } from '@angular/core';
import { PageloaderService } from '../../../pageloader.service';
import { MediaControlService } from './../../../media-control.service';

@Component({
  selector: 'app-page-01-03',
  templateUrl: './page-01-03.component.html',
  styleUrls: ['./page-01-03.component.css']
})
export class Page0103Component implements OnInit, AfterContentInit {
  private getMedia;
  loadingInterval: any;

  constructor(private mediaControl:MediaControlService, private loaderService: PageloaderService) { }

  ngOnInit() {
    this.loaderService.loadedAllImages = false;
    this.loaderService.showHideLoaderAnim(true);
    this.loaderService.getPageNo();
  }

  ngAfterContentInit(){
    this.loadingInterval = setInterval(() =>{
      if(this.loaderService.loadedAllImages){
        this.startCourse();
      }
    },40);
    
  }

  startCourse(){
    clearInterval(this.loadingInterval);
    this.loaderService.showHideLoaderAnim(false);
    this.loaderService.showHideLoaderAnim(false);
    this.getMedia = document.getElementsByTagName("video")[0];
    this.mediaControl.getMediaFile(this.getMedia);
  }
}
