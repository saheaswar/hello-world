import { Injectable } from '@angular/core';
import { NavigatorControlService } from './navigator-control.service';
import { PagedetailService } from './pagedetail.service';
import { TweenMax } from 'gsap';

declare var $: any;

let that;

@Injectable()
export class ResourceControlService {
  private resourceData;
  private resourceDetails;
  private resourceBtn;
  private resourceCloseBtn;
  private resourcePopup;
  private resourceContainer;
  private resourceContent;
  private resourceSelectedLetter = 0;
  private resourceSelectedWord = 0

  constructor(private navigator: NavigatorControlService, private navDetails: PagedetailService) { that = this;}


  getResourceData(url){
    this.resourceData = this.navDetails.callData(url);
    this.resourceData.subscribe(result => this.getResourceDetails(result));
  }
  
  getResourceDetails(gDetails){
    this.resourceDetails = gDetails;
    this.initResourceElements();
    this.controlResourceBtn();
    this.createResources();
  }

  initResourceElements(){
    this.resourceBtn = document.getElementById("f_resourceBtn");
    this.resourceCloseBtn = document.getElementById("f_resourceClose");
    this.resourcePopup = document.getElementById("f_resourcePopup");
    this.resourceContainer = document.getElementById("f_resourceContainer");
    this.resourceContent = document.getElementById("f_resourceContent");

    $('#f_resourceContent').enscroll({
      verticalTrackClass: 'resourceTrack',
      verticalHandleClass: 'resourceHandle'
    })

  }

  controlResourceBtn(){
    this.navigator.multipleListener(this.resourceBtn, "addListener", "click mouseenter mouseleave", this.fnShowResource);
    this.navigator.multipleListener(this.resourceCloseBtn, "addListener", "click mouseenter mouseleave", this.fnHideResource);
  }

  createResources() {
    let createRow;
    let createCol1;
    let createCol2;

    this.resourceContent.removeChild(this.resourceContent.firstChild);

    if (this.resourceDetails.length > 0) {
      for (let i = 0; i < this.resourceDetails.length; i++) {
        createRow = document.createElement("div");
        createRow.classList.add("f_resourceRow");

        createCol1 = document.createElement("div");
        createCol1.classList.add("f_resourceColumn1");
        createCol1.innerHTML = '<p>' + this.resourceDetails[i].col1 + '</p>';

        createCol2 = document.createElement("div");
        createCol2.classList.add("f_resourceColumn2");
        createCol2.innerHTML = '<p>' + this.resourceDetails[i].col2 + '</p>';

        createRow.appendChild(createCol1);
        createRow.appendChild(createCol2);

        this.resourceContent.appendChild(createRow);
      }
    }
  }

  private fnShowResource(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      that.resourcePopup.style.display = "block";
                          that.resourceContainer.style.display = "block";
                          TweenMax.to(that.resourceContainer, 0.2, {css:{scale:1}})
                          that.navigator.showHideGadgets(false);
                          if(that.navigator.mediaControlForOtherClass.mediaFile != undefined){
                            if(that.navigator.mediaControlForOtherClass.playState != "replay"){
                                that.navigator.mediaControlForOtherClass.pauseAudio();
                            }
                          }
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

  private fnHideResource(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      TweenMax.to(that.resourceContainer, 0.2, {css:{scale:0}, onComplete: () => {
                            that.resourceContainer.style.display = "none";
                            that.resourcePopup.style.display = "none";
                            if(that.navigator.mediaControlForOtherClass.mediaFile != undefined){
                              if(that.navigator.mediaControlForOtherClass.playState != "replay"){
                                if(that.navigator.mediaControlForOtherClass.playState == "play"){
                                  that.navigator.mediaControlForOtherClass.playAudio();
                                }else if(that.navigator.mediaControlForOtherClass.playState == "pause"){
                                  that.navigator.mediaControlForOtherClass.pauseAudio();
                                }
                              }
                            }
                          }})
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }

}
