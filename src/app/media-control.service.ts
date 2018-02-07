import { AnimationUtilsService } from './animation-utils.service';

import { Injectable } from '@angular/core';
import { PagedetailService } from './pagedetail.service';
import { DeviceDetectService } from './device-detect.service';
import { TimelineLite } from 'gsap';

let that;

@Injectable()
export class MediaControlService {

  mediaFile;
  audioDuration;
  audioCurrentTime;
  ppButton;
  muteButton;
  playState = "play";
  muteState = false;
  currentAnimation = new TimelineLite();
  getNavDetailWithoutImport;
  strictNavigation;

  private wrapper;
  private footer;
  private playPauseBtn;
  private muteBtn;
  private mediaThumb;
  private mediaScrubber;
  private mediaProgressBar;
  private medSeekBar;
  private scrubberWidth;
  private touch;
  private touchPageX = 0;
  private currentCC;
  private ccContainer;
  private mediaSync;
  private videoId = null;
  private mediaSrc = '';

  constructor(private navigation: PagedetailService,
              private deviceDetect: DeviceDetectService,
              private animUtils: AnimationUtilsService) { that = this; }

  resetAudio(){
    if(this.mediaFile != undefined){
      this.mediaFile.removeEventListener("canplaythrough", this.onloadedData);
      this.mediaFile.removeEventListener("timeupdate", this.onMediaUpdate);
      this.mediaFile.removeEventListener("ended", this.onEnded);
      this.mediaFile.currentTime = 0;
      this.mediaFile.pause();
    }
    this.mediaFile = undefined;
  }

  initMediaElements(){
    this.wrapper = document.getElementById("f_wrapper");
    this.footer = document.getElementById("f_footer");
    this.playPauseBtn = document.getElementById("f_mediaBtn");
    this.muteBtn = document.getElementById("f_volumeBtn");
    this.mediaThumb = document.getElementById("f_progress");
    this.mediaScrubber = document.getElementById("f_scrubber");
    this.mediaProgressBar = document.getElementById("f_progresBarHolder");
    this.medSeekBar = document.getElementById("f_knob");
    this.ccContainer = document.querySelector("#f_ccContainer p");
    this.mediaThumb.style.width = "0px";
    this.scrubberWidth = this.mediaScrubber.offsetWidth;
    
    this.multipleListener(this.playPauseBtn, "removeListener", "click mouseenter mouseleave", this.fnPlayPause);
    this.multipleListener(this.muteBtn, "removeListener", "click mouseenter mouseleave", this.fnMuteUnmute);
    this.mediaScrubber.removeEventListener('mousedown', this.scrubberDown);
    this.mediaScrubber.removeEventListener('touchstart', this.scrubberDown);

    if(this.deviceDetect.iOS()){
      this.muteBtn.style.display = "none";
    }else{
      this.muteBtn.style.display = "block";
    }
  }

  getMediaFile(){
    this.currentAnimation.kill();
    this.resetAudio();
    this.mediaFile = document.getElementById("courseAudio");
    if (this.videoId != null) {
      this.mediaSrc = '';
      this.mediaFile = document.getElementById(this.videoId)
      this.mediaSrc = this.mediaFile.getAttribute("src");
    }
    this.mediaFile.src = this.mediaSrc;
    this.mediaFile.load();
    this.mediaFile.addEventListener("canplaythrough", this.onloadedData);
    this.mediaFile.addEventListener("timeupdate", this.onMediaUpdate);
    this.mediaFile.addEventListener("ended", this.onEnded);
  }

  onloadedData(){
    that.audioDuration = (that.mediaFile.duration).toFixed(1);
    that.muteBtn.classList.remove("f_mute");
    that.muteBtn.classList.add("f_unmute");
    that.playState = "play";
    that.playAudio();
    that.playPauseBtn.classList.remove("f_play");
    that.playPauseBtn.classList.add("f_pause");
    if(!that.muteState){
      that.unmuteAudio();
    }else{
      that.muteAudio();
    }
    that.ccContainer.innerHTML = "";
  }

  removeListener(){
    this.resetAudio();
  }

  startPlayback(src, mediaSync, restriction, vidId){
    this.initMediaElements();
    this.strictNavigation = restriction;
    this.mediaSync = mediaSync;
    this.videoId = vidId;
    this.mediaSrc = src
    if(src != undefined){
      this.multipleListener(this.playPauseBtn, "addListener", "click mouseenter mouseleave", this.fnPlayPause);
      this.multipleListener(this.muteBtn, "addListener", "click mouseenter mouseleave", this.fnMuteUnmute);
      this.mediaScrubber.addEventListener('mousedown', this.scrubberDown);
      this.mediaScrubber.addEventListener('touchstart', this.scrubberDown);
      this.mediaThumb.style.cursor = "pointer";
      this.mediaScrubber.style.cursor = "pointer";
      this.playPauseBtn.style.opacity = 1;
      this.playPauseBtn.style.cursor = "pointer";
      this.muteBtn.style.opacity = 1;
      this.muteBtn.style.cursor = "pointer";
    }else{
      this.mediaThumb.style.cursor = "default";
      this.mediaScrubber.style.cursor = "default";
      this.playPauseBtn.style.opacity = 0.6;
      this.playPauseBtn.style.cursor = "default";
      this.muteBtn.style.opacity = 0.6;
      this.muteBtn.style.cursor = "default";
      this.muteBtn.classList.remove("f_mute");
      this.muteBtn.classList.add("f_unmute");
    }
    
    this.playPauseBtn.classList.remove("f_replay");
    this.playPauseBtn.classList.remove("f_play");
    this.playPauseBtn.classList.add("f_pause");

    this.getMediaFile()
  }

  getCurrentCcText(obj){
    this.currentCC = obj;
  }

  ccTextView(){
    for(let a=0;a<this.currentCC.length;a++){
      if(Number(this.audioCurrentTime) >= Number(this.currentCC[a].startTime) && Number(this.audioCurrentTime) <= Number(this.currentCC[a].endTime)){
        this.ccContainer.innerHTML = this.currentCC[a].text;
      }
    }
  }

  updateCurrentTime(_currTime) {
    this.currentAnimation.seek(_currTime);
  }

  updateVisitedStatus(_id) {
    this.navigation.visitedArray[_id - 1] = 1;
  }

  pageVisited() {
    this.updateVisitedStatus(this.navigation.currentPage);
    this.animUtils.startIndicatorAnimation();
    if (this.navigation.currentPage == this.navigation.totalPages) {
      this.getNavDetailWithoutImport.enableNextButton(false);
    } else {
      this.getNavDetailWithoutImport.enableNextButton(true);
    }
  }
  
  private onMediaUpdate(){
    that.audioCurrentTime = Number(that.mediaFile.currentTime).toFixed(1);
    var progressWidth = Math.round((that.audioCurrentTime/that.audioDuration)* that.scrubberWidth);
    that.mediaThumb.style.width = progressWidth+"px";
    that.updateCurrentTime(that.audioCurrentTime);
    that.ccTextView();
  }

  private onEnded(){
    that.playState = "replay";
    that.playPauseBtn.classList.remove("f_play");
    that.playPauseBtn.classList.remove("f_pause");
    that.playPauseBtn.classList.add("f_replay");
    console.log(that.strictNavigation);
    if (!that.strictNavigation) {
      that.pageVisited();
    }
  }

  private muteAudio(){
    this.muteBtn.classList.add("f_mute");
    this.muteBtn.classList.remove("f_unmute");
    this.muteState = true;
    this.mediaFile.volume = 0;
  }

  private unmuteAudio(){
    this.muteBtn.classList.remove("f_mute");
    this.muteBtn.classList.add("f_unmute");
    this.muteState = false;
    this.mediaFile.volume = 1;
  }

  private replayAudio(){
    this.mediaFile.currentTime = 0;
    this.mediaFile.play();
    this.currentAnimation.play();
  }

  private pauseAudio(){
    this.mediaFile.pause();
    this.currentAnimation.pause();
  }

  private playAudio(){
    this.mediaFile.play();
    this.currentAnimation.play();
  }

  private scrubberDown(e){
    e.stopPropagation();
    let styles = that.mediaScrubber.currentStyle || window.getComputedStyle(that.mediaScrubber);
    let _x = 0;
    let wrapperX = parseInt(that.wrapper.offsetLeft);
    let footerX = parseInt(that.footer.offsetLeft);
    let parentX = parseInt(that.mediaProgressBar.offsetLeft);
    let childMargin = styles.marginLeft;
    let childX = parseInt(childMargin.substr(0, childMargin.length-2));
    let currentX = wrapperX + footerX + parentX + childX;
    
    if(e.touches){
      that.touch = e.touches[0];
      that.updateProgressbar(that.touch.pageX);
      that.touchPageX = that.touch.pageX;
      document.addEventListener('touchmove',that.scrubberMousemove);
      document.addEventListener('touchend',that.scrubberUp);
      _x = Math.round(that.touchPageX-currentX);
    }
    else{
      that.updateProgressbar(e.pageX);
      document.addEventListener('mousemove', that.scrubberMousemove);
      document.addEventListener('mouseup',that.scrubberUp);
      _x = Math.round(e.pageX-currentX);
    }
    
    that.mediaFile.removeEventListener("timeupdate", that.onMediaUpdate);
    that.mediaFile.currentTime = (_x / that.scrubberWidth)*that.audioDuration;
    that.pauseAudio();
  }

  private scrubberUp(e){
    e.stopPropagation();
    let styles = that.mediaScrubber.currentStyle || window.getComputedStyle(that.mediaScrubber);
    let _x = 0;
    let wrapperX = parseInt(that.wrapper.offsetLeft);
    let footerX = parseInt(that.footer.offsetLeft);
    let parentX = parseInt(that.mediaProgressBar.offsetLeft);
    let childMargin = styles.marginLeft;
    let childX = parseInt(childMargin.substr(0, childMargin.length-2));
    let currentX = wrapperX + footerX + parentX + childX;

    if(e.touches){
      that.touch = e.touches[0];
      document.removeEventListener('touchmove',that.scrubberMousemove);
      document.removeEventListener('touchend',that.scrubberUp);
      _x = Math.round(that.touchPageX-currentX);
    }else{
      document.removeEventListener('mousemove', that.scrubberMousemove);
      document.removeEventListener('mouseup',that.scrubberUp);
      _x = Math.round(e.pageX-currentX);
    }
    that.mediaFile.currentTime = (_x / that.scrubberWidth)*that.audioDuration;
    that.mediaFile.addEventListener("timeupdate", that.onMediaUpdate);
    that.checkPlayPause();
  }

  private scrubberMousemove(e){
    let styles = that.mediaScrubber.currentStyle || window.getComputedStyle(that.mediaScrubber);
    let _x = 0;
    let wrapperX = parseInt(that.wrapper.offsetLeft);
    let footerX = parseInt(that.footer.offsetLeft);
    let parentX = parseInt(that.mediaProgressBar.offsetLeft);
    let childMargin = styles.marginLeft;
    let childX = parseInt(childMargin.substr(0, childMargin.length-2));
    let currentX = wrapperX + footerX + parentX + childX;

    if(e.touches){
      that.touch = e.touches[0];
      that.updateProgressbar(that.touch.pageX);
      that.touchPageX = that.touch.pageX;
      _x = Math.round(that.touchPageX-currentX);
    }else{
      that.updateProgressbar(e.pageX);
      _x = Math.round(e.pageX-currentX);
    }
    that.mediaFile.currentTime = (_x / that.scrubberWidth)*that.audioDuration;
    
  }

  private checkPlayPause(){
    switch(this.playState){
      case 'play':    this.playAudio();
                      this.playPauseBtn.classList.remove("f_play");
                      this.playPauseBtn.classList.add("f_pause");
                      break;
      case 'pause':   this.pauseAudio();
                      this.playPauseBtn.classList.add("f_play");
                      this.playPauseBtn.classList.remove("f_pause");
                      break;
     case 'replay':   this.playState = "play";
                      this.playAudio();
                      this.playPauseBtn.classList.remove("f_replay");
                      this.playPauseBtn.classList.remove("f_play");
                      this.playPauseBtn.classList.add("f_pause");
                      break;
    }
  }

  private updateProgressbar(_x){
    let styles = this.mediaScrubber.currentStyle || window.getComputedStyle(this.mediaScrubber);
    let styles2 = this.mediaProgressBar.currentStyle || window.getComputedStyle(this.mediaProgressBar);
    
    let wrapperX = parseInt(that.wrapper.offsetLeft);
    let footerX = parseInt(that.footer.offsetLeft);
    let parentX = parseInt(that.mediaProgressBar.offsetLeft);
    let childMargin = styles.marginLeft;
    let childX = parseInt(childMargin.substr(0, childMargin.length-2));
    let currentX = wrapperX + footerX + parentX + childX;
    
    let _width = Math.round(_x-currentX);
    if(_width<= 0){
      _width = 0;
    }
    
    if(this.scrubberWidth <= _width){
      _width = this.scrubberWidth;
    }

    that.mediaThumb.style.width = _width+"px";
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

  private fnMuteUnmute(e){
    let eventType = e.type;
    switch(eventType){
          case "click" :  if(!that.muteState){
                            that.muteAudio();
                          }else{
                            that.unmuteAudio();
                          }
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private fnPlayPause(e){
    let eventType = e.type;
    switch(eventType){
          case "click" :  if(that.playState == "play"){
                            that.playState = "pause";
                            that.pauseAudio();
                            e.currentTarget.classList.add("f_play");
                            e.currentTarget.classList.remove("f_pause");
                          }else if(that.playState == "pause"){
                            that.playState = "play";
                            that.playAudio();
                            e.currentTarget.classList.remove("f_play");
                            e.currentTarget.classList.add("f_pause");
                          }else if(that.playState == "replay"){
                            that.playState = "play";
                            that.animUtils.stopIndicatorAnimation();
                            that.replayAudio();
                            e.currentTarget.classList.add("f_pause");
                            e.currentTarget.classList.remove("f_play");
                            e.currentTarget.classList.remove("f_replay");
                            
                          }
                          break;
      case "mouseenter" :  
                          break;
      case "mouseleave" :  
                          break;
    }
  }
}
