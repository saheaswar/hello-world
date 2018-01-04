import { Injectable } from '@angular/core';

let medProgressElm;
let medThumbElm;
let medSeekElm;
let audioPer;

@Injectable()
export class MediasliderService {
  
  isDrag = false;
  seekPos;
  seekPercent;
  constructor() { }

  getSliderElements(mediaProgressElm, mediaThumbElm, mediaSeekElm){
    medProgressElm = mediaProgressElm;
    medThumbElm = mediaThumbElm;
    medSeekElm = mediaSeekElm;
  }

  moveThumbBar(seekBarLeft, sliderWidth){
    this.seekPercent = Math.round(((seekBarLeft + medSeekElm.offsetWidth) / sliderWidth)*100);
    console.log("this.seekPercent ", this.seekPercent)
    medThumbElm.style.width = this.seekPercent+"%";
  }

  getMediaSliderPos(sliderPageX, sliderLeft, sliderWidth, wrapperLeft){
    this.seekPos = (sliderPageX - sliderLeft) - wrapperLeft;
    this.seekPercent = Math.round((this.seekPos / sliderWidth)*100);
    medSeekElm.style.left = this.seekPercent - 2.5+"%";
    medThumbElm.style.width = this.seekPercent+"%";
  }

  updateSlider(per){
    audioPer = per;
    medSeekElm.style.left = audioPer - 2.5+"%";
    medThumbElm.style.width = audioPer+"%";
  }

  resetSlider(){
    audioPer = 0;
    medSeekElm.style.left = audioPer+"%";
    medThumbElm.style.width = audioPer+"%";
  }
  
}
