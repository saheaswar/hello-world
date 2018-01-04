import { MediasliderService } from './mediaslider.service';
import { Injectable } from '@angular/core';

let that;

@Injectable()
export class AudioControlService {

  audioFile;
  audioDuration;
  audioCurrentTime;
  ppButton;
  playState = "play";

  constructor(private mediaSlideControl: MediasliderService) { that = this; }

  resetAudio(){
    if(this.audioFile != undefined){
      this.audioFile.removeEventListener("loadeddata", this.onloadedData);
      this.audioFile.removeEventListener("timeupdate", this.onMediaUpdate);
      this.audioFile.removeEventListener("ended", this.onEnded);
      this.audioFile.currentTime = 0;
      this.audioFile.pause();
    }
    this.audioFile = undefined;
  }

  getPlayPauseButton(aPPBtn){
    this.ppButton = aPPBtn;
  }

  getAudioFile(aAud){
    this.resetAudio();
    this.audioFile = aAud;
    this.audioFile.addEventListener("loadeddata", this.onloadedData);
    this.audioFile.addEventListener("timeupdate", this.onMediaUpdate);
    this.audioFile.addEventListener("ended", this.onEnded);
  }

  onloadedData(){
    that.audioDuration = (that.audioFile.duration).toFixed(1);
    that.audioFile.play();
  }

  onMediaUpdate(){
    that.audioCurrentTime = (that.audioFile.currentTime).toFixed(1);
    let per = (that.audioCurrentTime/that.audioDuration)*100;
    that.mediaSlideControl.updateSlider(per);
  }

  onEnded(){
    that.playState = "replay";
    that.ppButton.style.backgroundPositionX = "-80px";
  }

  removeListener(){
    this.resetAudio();
  }

  replayAudio(){
    this.audioFile.currentTime = 0;
    this.audioFile.play();
  }

  pauseAudio(){
    this.audioFile.pause();
  }

  playAudio(){
    this.audioFile.play();
  }
}
