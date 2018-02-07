import { TweenMax, TimelineLite } from 'gsap';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AnimationUtilsService } from './../../../animation-utils.service';
import { MediaControlService } from './../../../media-control.service';
import { PageloaderService } from '../../../pageloader.service';
import { NavigatorControlService } from './../../../navigator-control.service';

let that;
@Component({
  selector: 'app-page-01-01',
  templateUrl: './page-01-01.component.html',
  styleUrls: ['./page-01-01.component.css']
})

export class Page0101Component implements AfterViewInit {
  loadingInterval: any;
  textCount = 0;
  private pagePreloadArray = { image: -1, audio: -1, video: 1, data: -1 }; // item not available please assign value 1.
  private jsonSRC = "assets/data/pages/page-1.json?v=";
  private pageData;
  private audioIndex = 0;
  private pageAudioSync = true;
  private forceNavigation = false;
  private videoId = null;

  constructor(  private loaderService: PageloaderService,
                private animUtils: AnimationUtilsService,
                private mediaControl: MediaControlService,
                private navControl: NavigatorControlService) { that = this; }

  ngAfterViewInit() {
    this.loaderService.initObj(this.pagePreloadArray, this.jsonSRC);
    this.loaderService.addCustomEvent('ready', this.pageLoaded);
  }

  pageLoaded() {
    that.pageData = that.loaderService.jsonData;
    that.addSlideData();
    that.assignAudio(that.pageData.audioSRC, that.audioIndex, that.pageAudioSync, that.forceNavigation, that.videoId);
    that.loaderService.showHideLoaderAnim(false);
    that.initPageAnimations();
  }
  
  // -------- Assign audio for play ------------
  assignAudio(_audioSRC, _ccIndx, _audioSync, _restriction, videoId) {
    var ccObj = this.pageData.ccText[_ccIndx];
    var transcriptObj = this.pageData.transcriptText[_ccIndx];
    this.navControl.loadMedia(_audioSRC, ccObj, _audioSync, _restriction, transcriptObj, videoId)
  }

  addSlideData() {
    let titleText = document.getElementsByClassName("title_text");
    let leftSide = document.getElementsByClassName("left_side");
    for(let i=0; i<titleText.length; i++){
      titleText[i].innerHTML += '<p>' + this.pageData.title + '</p>';
    }
    
    for (let i1 = 0; i1 < this.pageData.content.length; i1++) {
      let paraText = document.getElementsByClassName("para_text");
      for(let i2=0; i2<paraText.length; i2++){
        paraText[i2].innerHTML += '<p>' + this.pageData.content[i1] + '</p>';
      }
    }

    for (var j = 0; j < this.pageData.list.length; j++) {
      let listItems = document.getElementsByClassName("list_items");
      for(let j1=0; j1<listItems.length; j1++){
        listItems[j1].innerHTML += '<li>' + this.pageData.list[j] + '</li>';
      }
    }

    for(let j2=0; j2<leftSide.length; j2++){
      let leftImg = document.createElement("img");
      leftImg.src = this.pageData.leftSide.imageSRC;
      leftImg.setAttribute("alt", this.pageData.leftSide.altText);
      leftImg.setAttribute("title", this.pageData.leftSide.altText);
      leftSide[j2].appendChild(leftImg);
    }
    this.setCSS();
  }

  setCSS() {
    /*let wrapper = document.getElementById("f_wrapper");
    let wrapperWidth = wrapper.clientWidth;
    let wrapperHeight = wrapper.clientHeight;

    if(wrapperWidth >= 1024){
      this.mediaQuery('ipad-landscape');
    }else if(wrapperWidth >= 768 && wrapperWidth < 1024){
      this.mediaQuery('ipad-portrait');
    }*/
  }

  mediaQuery(device) {
    switch (device) {
        case 'ipad-landscape':

            break
        case 'ipad-portrait':

            break
    }
  }

  // -------- animations ------------


  initPageAnimations() {
    
    if (this.pageAudioSync) {
        this.withAudioSync();
    } else {

    }
  }

  withAudioSync() {
    let imgContainer = document.getElementsByClassName('pg-img-container');
    let leftSide = document.getElementsByClassName('left_side');
    let titleText = document.getElementsByClassName('title_text');
    let paraText = document.querySelector('.para_text');
    let listItems = document.querySelector('.list_items');
    for(let i=0;i<paraText.children.length;i++){
      paraText.children[i].setAttribute("style", "position: relative; float: left; margin-bottom: 15px; left: -40px; opacity: 0;");
    }
    paraText.children[paraText.children.length - 1].setAttribute("style", "position: relative; float: left; margin-bottom: 0px; left: -40px; opacity: 0;");

    for(let i=0;i<listItems.children.length;i++){
      listItems.children[i].setAttribute("style", "position: relative; margin-bottom: 10px; padding-left: 10px; margin-left: 40px; opacity: 0; left: -80px;");
    }

    if (this.mediaControl.currentAnimation) {
      this.mediaControl.currentAnimation.kill();
    }
    this.mediaControl.currentAnimation = new TimelineLite();

    this.mediaControl.currentAnimation.add(this.animUtils.animateChangeWidth(imgContainer, 0.6, '100%').play(), 0.5);
    this.mediaControl.currentAnimation.add(this.animUtils.animateFadeIn(leftSide, 0.5).play(), 0.8);
    this.mediaControl.currentAnimation.add(this.animUtils.animateFromLeft(titleText, 0.5, 0).play(), 1.4);
    this.mediaControl.currentAnimation.add(this.animUtils.animateFromLeft(paraText.children[0], 0.5, 0).play(), 2.5);
    this.mediaControl.currentAnimation.add(this.animUtils.animateFromLeft(paraText.children[1], 0.5, 0).play(), 16.1);
    this.mediaControl.currentAnimation.add(this.animUtils.animateFromLeft(listItems.children[0], 0.5, 0).play(), 27.2);
    this.mediaControl.currentAnimation.add(this.animUtils.animateFromLeft(listItems.children[1], 0.5, 0).play(), 31.2);
  }
}