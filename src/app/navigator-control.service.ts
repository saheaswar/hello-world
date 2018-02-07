import { AnimationUtilsService } from './animation-utils.service';
import { SpriteAnimationService } from './sprite-animation.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from './app.route';
import { PagedetailService } from './pagedetail.service';
import { MediaControlService } from './media-control.service';
import { BrowserDetectService } from './browser-detect.service';
import { DeviceDetectService } from './device-detect.service';

import { TweenMax } from 'gsap';

declare var $: any;

let that ;

@Injectable()
export class NavigatorControlService {

  public pageDetails;
  private pageNumberBlock;
  private courseTitle;
  private pageTitle;
  private homeBtn;
  private helpBtn;
  private gadgetBtn;
  private nextBtn;
  private backBtn;
  private pageData;
  private isMedia;
  private transBtn;
  private transData;
  private transClose;
  private transContainer;
  private ccData;
  private ccBtn;
  private ccContainer;
  private transcriptClosed = false;
  private ccClosedFlag = false;
  private ccClicked = false;
  private gadgetToggle: Boolean = false;

  public mediaControlForOtherClass;

  constructor(
    private navDetails:PagedetailService,
    private myRoutes:Router,
    public mediaControl: MediaControlService,
    private browserDetect: BrowserDetectService,
    private deviceDetect: DeviceDetectService,
    private spriteAnim: SpriteAnimationService,
    private animUtils: AnimationUtilsService
  ) { that = this;};

  getCourseData(url){
    this.pageData = this.navDetails.callData(url);
    this.pageData.subscribe(result => this.getPageDetails(result));
    this.mediaControlForOtherClass = this.mediaControl;
  }

  getPageDetails(aData){
    this.pageDetails = aData;
    this.navDetails.currentPage = this.pageDetails.setCurrentPage;
    this.navDetails.totalPages = this.pageDetails.totalPages;
    this.mediaControl.strictNavigation = this.pageDetails.strictNavigation;
    this.initializeElements();
    this.elementController();
    this.navigatePage(this.navDetails.moduleNo, this.navDetails.currentPage);
    this.enableDisableButton();
    this.getPageNo(this.navDetails.currentPage, this.navDetails.totalPages);
  }

  navigatePage(aMno, aPno){

    this.animUtils.stopIndicatorAnimation();
    this.spriteAnim.stopAnimation();
    this.enableDisableButton();
    this.mediaControl.getNavDetailWithoutImport = this;
    //this.navDetails.visitedArray[aPno - 1] = 1;
    this.mediaControl.removeListener();
    this.pageTitle.innerHTML = this.pageDetails.pageDetails[0]["page-"+this.navDetails.currentPage][0].title;
   this.myRoutes.navigate(['/page_'+aMno+"_"+aPno],{skipLocationChange: true});

    this.getPageNo(aPno, this.navDetails.totalPages);
  }

  getPageNo(currPage, totPage){
    this.pageNumberBlock = document.getElementById("f_pageCounterText");
    if(currPage < 10){
      currPage = "0" + currPage;
    }
    if(totPage < 10){
      totPage = "0" + totPage;
    }
    this.pageNumberBlock.innerHTML = currPage + " / " + totPage;
  }

  multipleListener(element, listerType, events, listener?){
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

  showHideGadgets(flag){
    let gPopup = document.getElementById("f_gadgetPopup");
    let gPatch = document.getElementById("f_gadgetPatch");
    if(flag){
      gPopup.style.display = "block";
      TweenMax.to(gPatch, 0.05, {'height': 7, onComplete: () => {
        TweenMax.to(gPopup, 0.3, {'height': 93});
      }})
    }else{
      TweenMax.to(gPopup, 0.3, {'height': 0, onComplete: () => {
        TweenMax.to(gPatch, 0, {'height': 0, onComplete: () => {
          gPopup.style.display = "none";
        } });
      }});
    }
    this.gadgetToggle = !this.gadgetToggle;
  }

  getTranscriptText(){
    let transTextCon = document.getElementById("f_transText");
    transTextCon.innerHTML = this.transData;
  }

  loadMedia(_src, ccObj, _audioSync, _restriction, _transcriptObj, _videoId) {
    this.mediaControl.startPlayback(_src, _audioSync, _restriction, _videoId)
    this.ccData = ccObj
    this.transData = _transcriptObj;
    this.getTranscriptText();
    this.enableDisableCc();
    this.enableDisableTranscript();
  }
  
  private initializeElements(){
    this.courseTitle = document.querySelector("#f_courseTitle p");
    this.pageTitle = document.querySelector("#f_pageTitle p");
    this.nextBtn = document.getElementById("f_nextBtn");
    this.backBtn = document.getElementById("f_backBtn");
    this.homeBtn = document.getElementById("f_homeBtn");
    this.gadgetBtn = document.getElementById("f_gadgetBtn");
    this.helpBtn = document.getElementById("f_helpBtn");
    this.ccBtn = document.getElementById("f_ccBtn");
    this.ccContainer = document.getElementById("f_ccContainer");
    this.transBtn = document.getElementById("f_transcriptBtn");
    this.transClose = document.getElementById("f_transClose");
    this.transContainer = document.getElementById("f_transcriptContainer");

    this.courseTitle.innerHTML = this.pageDetails.courseTitle;
    $('#f_transContent').enscroll({
      verticalTrackClass: 'transTrack',
      verticalHandleClass: 'transHandle'
    })

    $('#f_transcriptContainer').draggable({
      containment: '#f_wrapper'
    })
  }

  private elementController(){
    this.multipleListener(this.nextBtn, "addListener", "click mouseenter mouseleave", this.fnNextBack);
    this.multipleListener(this.backBtn, "addListener", "click mouseenter mouseleave", this.fnNextBack);
    this.multipleListener(this.homeBtn, "addListener", "click mouseenter mouseleave", this.fnHome);
    this.multipleListener(this.gadgetBtn, "addListener", "click mouseenter mouseleave", this.fnGadget);
    this.multipleListener(this.transClose, "addListener", "click mouseenter mouseleave", this.fnHideTranscript);
    this.enableHomeButton(false);
    this.enableHelpButton(false);

  }

  private enableDisableCc(){
    if(this.ccData != ""){
      this.ccBtn.style.cursor = "pointer";
      this.ccBtn.style.opacity = "1";
      this.multipleListener(this.ccBtn, "addListener", "click mouseenter mouseleave", this.fnShowHideCc);
      if(this.ccClosedFlag){
        this.ccContainer.style.opacity = 1;
        this.ccContainer.style.display = "block";
      }else{
        this.ccContainer.style.opacity = 0;
        this.ccContainer.style.display = "none";
      }
      this.mediaControl.getCurrentCcText(this.ccData);
    }else{
      this.ccBtn.style.cursor = "default";
      this.ccBtn.style.opacity = "0.5";
      this.multipleListener(this.ccBtn, "removeListener", "click mouseenter mouseleave", this.fnShowHideCc);
      this.ccContainer.style.opacity = 0;
      this.ccContainer.style.display = "none";
    }
  }

  private enableDisableTranscript(){
    if(this.transData != ""){
      this.transBtn.style.cursor = "pointer";
      this.transBtn.style.opacity = "1";
      this.multipleListener(this.transBtn, "addListener", "click mouseenter mouseleave", this.fnShowTranscript);
      if(this.transcriptClosed){
        this.transContainer.style.transform = "scale(1)";
        this.transContainer.style.display = "block";
      }else{
        this.transContainer.style.transform = "scale(0)";
        this.transContainer.style.display = "none";
      }
    }else{
      this.transBtn.style.cursor = "default";
      this.transBtn.style.opacity = "0.5";
      this.multipleListener(this.transBtn, "removeListener", "click mouseenter mouseleave", this.fnShowTranscript);
      this.transContainer.style.transform = "scale(0)";
      this.transContainer.style.display = "none";
    }
  }

  private fnShowHideCc(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      if(!that.ccClosedFlag){
                            that.ccContainer.style.display = "block";
                            TweenMax.to(that.ccContainer, 0.2, {css:{opacity:1}});
                            that.ccClosedFlag = true;
                          }else{
                            that.ccClosedFlag = false;
                            TweenMax.to(that.ccContainer, 0.2, {css:{opacity:0}, onComplete: () => {
                              that.ccContainer.style.display = "none";
                            }})
                          }
                          that.showHideGadgets(false);
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private fnShowTranscript(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      if(!that.transcriptClosed){
                            that.transContainer.style.display = "block";
                            TweenMax.to(that.transContainer, 0.2, {css:{scale:1}});
                            that.transcriptClosed = true;
                          }else{
                            that.transcriptClosed = false;
                            TweenMax.to(that.transContainer, 0.2, {css:{scale:0}, onComplete: () => {
                              that.transContainer.style.display = "none";
                            }})
                          }
                          that.showHideGadgets(false);
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private fnHideTranscript(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      that.transcriptClosed = false;
                          TweenMax.to(that.transContainer, 0.2, {css:{scale:0}, onComplete: () => {
                            that.transContainer.style.display = "none";
                          }});
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private fnHome(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      that.navDetails.currentPage = 1;
                          that.getTranscriptText(that.navDetails.currentPage - 1);
                          that.enableDisableCc();
                          that.enableDisableTranscript();
                          that.navigatePage(that.navDetails.moduleNo, that.navDetails.currentPage);
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private fnHelp(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private fnGadget(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      if(!that.gadgetToggle){
                            that.showHideGadgets(true);
                          }else{
                            that.showHideGadgets(false);
                          }
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private fnNextBack(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      that.goToNextPrevPage(e.currentTarget.id);
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private goToNextPrevPage(aId){
    switch(aId){
      case "f_nextBtn" :  that.navDetails.currentPage++;
                          that.getTranscriptText(that.navDetails.currentPage - 1);
                          that.enableDisableCc();
                          that.enableDisableTranscript();
                          that.navigatePage(that.navDetails.moduleNo, that.navDetails.currentPage);
                          break;
      case "f_backBtn" :  that.navDetails.currentPage--;
                          that.getTranscriptText(that.navDetails.currentPage - 1);
                          that.enableDisableCc();
                          that.enableDisableTranscript();
                          that.navigatePage(that.navDetails.moduleNo, that.navDetails.currentPage);
                          break;
    }
    
  }

  private enableDisableButton(){
    if(this.navDetails.currentPage > 1 && this.navDetails.currentPage < this.navDetails.totalPages){
      this.enableNextButton(true);
      this.enableBackButton(true);
    } else if(this.navDetails.currentPage <= 1){
      this.enableNextButton(true);
      this.enableBackButton(false);
    } else{
      this.enableNextButton(false);
      this.enableBackButton(true);
    }
    if(this.mediaControl.strictNavigation && this.navDetails.visitedArray[this.navDetails.currentPage - 1] == undefined){
      this.enableNextButton(false);
    }else{
      this.enableNextButton(true);
    }
  }

  private enableNextButton(flag){
    if(flag){
      this.multipleListener(this.nextBtn, "addListener", "click mouseenter mouseleave", this.fnNextBack);
      this.nextBtn.style.opacity = 1;
      this.nextBtn.style.cursor = "pointer";
    }else{
      this.multipleListener(this.nextBtn, "removeListener", "click mouseenter mouseleave", this.fnNextBack);
      this.nextBtn.style.opacity = 0.5;
      this.nextBtn.style.cursor = "default";
    }
  }

  private enableBackButton(flag){
    if(flag){
      this.multipleListener(this.backBtn, "addListener", "click mouseenter mouseleave", this.fnNextBack);
      this.backBtn.style.opacity = 1;
      this.backBtn.style.cursor = "pointer";
    }else{
      this.multipleListener(this.backBtn, "removeListener", "click mouseenter mouseleave", this.fnNextBack);
      this.backBtn.style.opacity = 0.5;
      this.backBtn.style.cursor = "default";
    }
  }

  private enableHomeButton(flag){
    if(flag){
      this.multipleListener(this.homeBtn, "addListener", "click mouseenter mouseleave", this.fnHome);
      this.homeBtn.style.opacity = 1;
      this.homeBtn.style.cursor = "pointer";
    }else{
      this.multipleListener(this.homeBtn, "removeListener", "click mouseenter mouseleave", this.fnHome);
      this.homeBtn.style.opacity = 0.5;
      this.homeBtn.style.cursor = "default";
    }
  }

  private enableHelpButton(flag){
    if(flag){
      this.multipleListener(this.helpBtn, "addListener", "click mouseenter mouseleave", this.fnHelp);
      this.helpBtn.style.opacity = 1;
      this.helpBtn.style.cursor = "pointer";
    }else{
      this.multipleListener(this.helpBtn, "removeListener", "click mouseenter mouseleave", this.fnHelp);
      this.helpBtn.style.opacity = 0.5;
      this.helpBtn.style.cursor = "default";
    }
  }
}
