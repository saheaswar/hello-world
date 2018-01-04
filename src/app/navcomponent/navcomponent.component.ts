import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../app.route';
import { PagedetailService } from './../pagedetail.service';
import { MediasliderService } from './../mediaslider.service';
import { AudioControlService } from './../audio-control.service';
import { TweenMax } from 'gsap';

declare var $: any;

let that ;

@Component({
  selector: 'footers',
  templateUrl: './navcomponent.component.html',
  styleUrls: ['./navcomponent.component.css']
})

export class NavcomponentComponent implements OnInit {
  private nextBtn;
  private backBtn;
  private playPauseBtn;
  private mediaThumb;
  private mediaTrack;
  private mediaProgressBar;
  private medSeekBar;
  private getWrapper;
  private pageData;
  public pageDetails;
  private isMedia;
  private onDrag: Boolean = false;
  
  constructor(
    private navDetails:PagedetailService,
    private myRoutes:Router,
    private mediaSlider: MediasliderService,
    private audioControl: AudioControlService
  ) { that = this}

  ngOnInit() {

    this.pageData = this.navDetails.callData('assets/data/courseDetails.json');
    this.pageData.subscribe(result => this.getPageDetails(result));
    this.navDetails.getAllScormData();
  }

  
  getPageDetails(aData){
    this.pageDetails = aData;
    this.navDetails.currentPage = this.pageDetails.setCurrentPage;
    this.navDetails.totalPages = this.pageDetails.totalPages;
    this.initializeElements();
    this.elementController();
    this.navigatePage(this.navDetails.currentPage);
    this.enableDisableButton();
  }

  private initializeElements(){
    this.nextBtn = document.getElementById("nextButton");
    this.backBtn = document.getElementById("backButton");
    this.playPauseBtn = document.getElementById("playPauseButton");
    this.mediaThumb = document.getElementById("mediaThumb");
    this.mediaTrack = document.getElementById("mediaTrack");
    this.mediaProgressBar = document.getElementById("mediaProgressBar");
    this.medSeekBar = document.getElementById("mediaSeekBar");
    this.getWrapper = document.getElementById("wrapper");
    this.audioControl.getPlayPauseButton(this.playPauseBtn);
    this.mediaSlider.getSliderElements(this.mediaProgressBar, this.mediaThumb, this.medSeekBar);
  }

  private elementController(){
    this.multipleListener(this.nextBtn, "addListener", "click mouseenter mouseleave", this.fnNextBack);
    this.multipleListener(this.backBtn, "addListener", "click mouseenter mouseleave", this.fnNextBack);
    this.checkIsMedia();
    $(this.medSeekBar).draggable({
      containment: this.mediaProgressBar,
      drag: function(){
        that.onDrag = true;
        that.mediaSlider.isDrag = true;
        that.mediaSlider.moveThumbBar(that.medSeekBar.offsetLeft, that.mediaProgressBar.offsetWidth);
        that.audioControl.audioFile.pause();
      },
      stop: function(){
        that.onDrag = false;
        that.mediaSlider.isDrag = false;
        TweenMax.to(that.medSeekBar, .5, {autoAlpha: 0 });
        let getCurrentTime = ((that.audioControl.audioDuration * that.mediaSlider.seekPercent) / 100).toFixed(1);
        that.audioControl.audioCurrentTime = getCurrentTime;
        that.audioControl.audioFile.currentTime = that.audioControl.audioCurrentTime;
        if(that.audioControl.audioFile.currentTime < that.audioControl.audioDuration){
          if(that.audioControl.playState == "play" || that.audioControl.playState == "replay"){
            that.audioControl.playState = "play";
            that.audioControl.audioFile.play();
            that.playPauseBtn.style.backgroundPositionX = "-40px";
          }else if(that.audioControl.playState == "pause"){
            that.audioControl.playState = "pause";
            that.audioControl.audioFile.pause();
            that.playPauseBtn.style.backgroundPositionX = "0px";
          }
        }
      }
    });
  }

  private mediaTrackListener(e){
    let eventType = e.type;
    switch(eventType){
      case "mousedown" :  that.seekSliderAndAudioPos(e);
                          return;
      case "mouseenter" : TweenMax.to(that.medSeekBar, .5, {autoAlpha: 1 });
                          return;
      case "mouseleave" : if(!that.onDrag){
                            TweenMax.to(that.medSeekBar, .5, {autoAlpha: 0 });
                          }
                          return;
    }
  }

  private seekSliderAndAudioPos(e){
    let elmPageX = e.pageX;
    let elmLeft = e.currentTarget.offsetLeft;
    let emlWidth = e.currentTarget.offsetWidth;
    let wrapperLeft = that.getWrapper.offsetLeft
    that.mediaSlider.getMediaSliderPos(elmPageX, elmLeft, emlWidth, wrapperLeft);
    let getCurrentTime = ((that.audioControl.audioDuration * that.mediaSlider.seekPercent) / 100).toFixed(1);
    that.audioControl.audioCurrentTime = getCurrentTime;
    that.audioControl.audioFile.currentTime = that.audioControl.audioCurrentTime;
    if(that.audioControl.audioFile.currentTime < that.audioControl.audioDuration){
      if(that.audioControl.playState == "play" || that.audioControl.playState == "replay"){
        that.audioControl.playState = "play";
        that.audioControl.audioFile.play();
        that.playPauseBtn.style.backgroundPositionX = "-40px";
      }else if(that.audioControl.playState == "pause"){
        that.audioControl.playState = "pause";
        that.audioControl.audioFile.pause();
        that.playPauseBtn.style.backgroundPositionX = "0px";
      }
    }
  }

  private multipleListener(element, listerType, events, listener?){
    let eventSpliter:string[] = events.split(" ");
    if(listerType == "addListener"){
      for(let i=0;i<eventSpliter.length;i++){
        element.addEventListener(eventSpliter[i],listener);
      }
    }else if(listerType == "removeListener"){
      for(let i=0;i<eventSpliter.length;i++){
        element.removeEventListener(eventSpliter[i],listener);
      }
    }
  }

  private fnPlayPause(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :  if(that.audioControl.playState == "play"){
                        that.audioControl.playState = "pause";
                        that.audioControl.pauseAudio();
                        e.currentTarget.style.backgroundPositionX = "0px";
                      }else if(that.audioControl.playState == "pause"){
                        that.audioControl.playState = "play";
                        that.audioControl.playAudio();
                        e.currentTarget.style.backgroundPositionX = "-40px";
                      }else if(that.audioControl.playState == "replay"){
                        that.audioControl.playState = "play";
                        that.audioControl.replayAudio();
                        e.currentTarget.style.backgroundPositionX = "-40px";
                      }
                      
                      return;
      case "mouseenter" :  e.currentTarget.style.backgroundPositionY = "-40px";
                      return;
      case "mouseleave" :  e.currentTarget.style.backgroundPositionY = "0px";
                      return;
    }
  }

  private fnNextBack(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :  that.goToNextPrevPage(e.currentTarget.id);
                      e.currentTarget.style.backgroundPosition = "-40px 0px";
                      return;
      case "mouseenter" :  e.currentTarget.style.backgroundPosition = "0px 0px";
                      return;
      case "mouseleave" :  e.currentTarget.style.backgroundPosition = "-40px 0px";
                      return;
    }
  }

  private goToNextPrevPage(aId){
    switch(aId){
      case "nextButton" : this.navDetails.currentPage++;
                          this.enableDisableButton();
                          this.navigatePage(this.navDetails.currentPage);
                          return;
      case "backButton" : this.navDetails.currentPage--;
                          this.enableDisableButton();
                          this.navigatePage(this.navDetails.currentPage);
                          return;
    }
    
  }

  private navigatePage(aPno){
    this.audioControl.removeListener();
    this.mediaSlider.resetSlider();
    this.checkIsMedia();
    this.myRoutes.navigate(['/page-'+aPno],{skipLocationChange: true});
  }

  private enableDisableButton(){
    if(this.navDetails.currentPage > 1 && this.navDetails.currentPage < this.navDetails.totalPages){
      this.enableNextButton();
      this.enableBackButton();
    } else if(this.navDetails.currentPage <= 1){
      this.enableNextButton();
      this.disableBackButton();
    } else{
      this.disableNextButton();
      this.enableBackButton();
    }
  }

  private enableNextButton(){
    this.multipleListener(this.nextBtn, "addListener", "click mouseenter mouseleave", this.fnNextBack);
    this.nextBtn.style.opacity = 1;
    this.nextBtn.style.cursor = "pointer";
  }

  private disableNextButton(){
    this.multipleListener(this.nextBtn, "removeListener", "click mouseenter mouseleave", this.fnNextBack);
    this.nextBtn.style.opacity = 0.5;
    this.nextBtn.style.cursor = "default";
  }

  private enableBackButton(){
    this.multipleListener(this.backBtn, "addListener", "click mouseenter mouseleave", this.fnNextBack);
    this.backBtn.style.opacity = 1;
    this.backBtn.style.cursor = "pointer";
  }

  private disableBackButton(){
    this.multipleListener(this.backBtn, "removeListener", "click mouseenter mouseleave", this.fnNextBack);
    this.backBtn.style.opacity = 0.5;
    this.backBtn.style.cursor = "default";
  }

  private checkIsMedia(){
    if(this.pageDetails.pageDetails[0]["page-"+this.navDetails.currentPage][0].isMedia){
      this.multipleListener(this.playPauseBtn, "addListener", "click mouseenter mouseleave", this.fnPlayPause);
      this.multipleListener(this.mediaProgressBar, "addListener", "mousedown mouseenter mouseleave", this.mediaTrackListener);
      this.mediaProgressBar.style.opacity = 1;
      this.mediaProgressBar.style.cursor = "pointer";
      this.mediaThumb.style.cursor = "pointer";
      this.mediaTrack.style.cursor = "pointer";
      this.medSeekBar.style.cursor = "pointer";
      this.playPauseBtn.style.opacity = 1;
      this.playPauseBtn.style.cursor = "pointer";
    }else{
      this.multipleListener(this.playPauseBtn, "removeListener", "click mouseenter mouseleave", this.fnPlayPause);
      this.multipleListener(this.mediaProgressBar, "removeListener", "mousedown mouseenter mouseleave", this.mediaTrackListener);
      this.mediaProgressBar.style.opacity = 0.6;
      this.mediaProgressBar.style.cursor = "default";
      this.mediaThumb.style.cursor = "default";
      this.medSeekBar.style.cursor = "default";
      this.mediaTrack.style.cursor = "default";
      this.playPauseBtn.style.opacity = 0.6;
      this.playPauseBtn.style.cursor = "default";
    }
  }
}
