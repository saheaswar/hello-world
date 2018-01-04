import { Component, OnInit, AfterContentInit } from '@angular/core';
import { PageloaderService } from '../../pageloader.service';
import { AudioControlService } from './../../audio-control.service';

@Component({
  selector: 'app-page-3',
  templateUrl: './page-3.component.html',
  styleUrls: ['./page-3.component.css']
})
export class Page3Component implements OnInit, AfterContentInit {
  private getAudio;
  loadingInterval: any;

  constructor(private audioControl:AudioControlService, private loaderService: PageloaderService) { }

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
    this.getAudio = document.getElementsByTagName("video")[0];
    this.audioControl.getAudioFile(this.getAudio);
  }
}
