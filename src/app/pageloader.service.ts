
import { Injectable } from '@angular/core';
import { JsondataService } from './jsondata.service';
import { PagedetailService } from './pagedetail.service';
import { SpriteAnimationService } from './sprite-animation.service';
let that;
@Injectable()
export class PageloaderService {
  private loadClass = document.getElementById('f_preloader');
  private loaderSprite = document.getElementById('f_loaderImage');

  data = { image: 1, audio: 1, video: 1, data: 1 };
  json = '';
  jsonData = {};
  getJsonData;
  events_Obj = [];
  audioLength = 0;
  audioLoadCount = 0;
  videoLength = 0;
  videoLoadCount = 0;

  loadedAllAssets = false;

  constructor(private pageData:JsondataService, private getPageDetails:PagedetailService, private loadSprite: SpriteAnimationService){
    that = this;
  }

  initObj(_data, _json) {
    this.data = _data;
    this.json = _json;
    this.audioLength = 0;
    this.audioLoadCount = 0;
    this.videoLength = 0;
    this.videoLoadCount = 0;

    this.preloadData();
  }

  preloadData(){
    this.getJsonData = this.callPageData(this.json+(new Date().getTime()));
    this.getJsonData.subscribe(result => this.getPageJsonDetails(result));
  }

  callPageData(aUrl){
    return this.pageData.jsonData(aUrl);
  }

  getPageJsonDetails(data){
    this.jsonData = data;
    this.data.data = 1;
    this.showHideLoaderAnim(true);
    this.preloadAudio();
    this.preloadVideo();
    this.preloadImage();
    this.checkPreload();
  }
  
  getObjects(obj, key) {
    let objects = [];
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(this.getObjects(obj[i], key));
        } else if (i == key) {
            objects.push(obj);
        }
    }
    return objects;
  }

  preloadImage() {
    let _imgObj = this.getObjects(this.jsonData, "imageSRC");
    let imgLength = _imgObj.length;
    let imgLoadCount = 0;

    for (var i = 0; i < imgLength; i++) {
        var _img = new Image();
        _img.src = _imgObj[i].imageSRC;
        _img.onload = function() {
            imgLoadCount++;
            if (imgLoadCount == imgLength) {
                that.data.image = 1;
                that.checkPreload();
            }
        }
    }
  }

  preloadAudio() {
    let _audioObj = this.getObjects(this.jsonData, "audioSRC");
    this.audioLength = _audioObj.length;
    this.audioLoadCount = 0;

    for (var j = 0; j < this.audioLength; j++) {
        var _audio = new Audio();
        _audio.src = _audioObj[j].audioSRC;
        _audio.load();
        _audio.addEventListener('canplaythrough', this.loadAudioEvent);
    }
  }

  loadAudioEvent(e) {
    that.audioLoadCount++;
    if (that.audioLoadCount == that.audioLength) {
      that.data.audio = 1;
      that.checkPreload();
    }
    e.currentTarget.removeEventListener('canplaythrough', this.loadAudioEvent);
  }

  preloadVideo() {
    var _videoObj = this.getObjects(this.jsonData, "videoSRC");
    this.videoLength = _videoObj.length;
    this.videoLoadCount = 0;

    for (var k = 0; k < this.videoLength; k++) {
        var _video = document.createElement('video');
        _video.src = _videoObj[k].videoSRC;
        _video.load();
        _video.addEventListener('canplaythrough', this.loadVideoEvent);
    }
  }

  loadVideoEvent(e) {
    that.videoLoadCount++;
    if (that.videoLoadCount == that.videoLength) {
      that.data.video = 1;
      that.checkPreload();
    }
    e.currentTarget.removeEventListener('canplaythrough', that.loadVideoEvent);
  }

  checkPreload() {
    if (this.data.image == 1 && this.data.audio == 1 && this.data.video == 1 && this.data.data == 1) {
        this.dispatchCustomEvent('ready')
    }
  }

  addCustomEvent(evet, callback) {
    this.events_Obj.push({
        'eventName': evet,
        'funcCallBack': callback
    })
  }

  dispatchCustomEvent = function(arg) {
    for (var i = 0; i < this.events_Obj.length; i++) {
        if (this.events_Obj[i].eventName == arg) {
            this.events_Obj[i].funcCallBack()
            break
        }
    }
  }

  showHideLoaderAnim(lFlag){
    if(lFlag){
      this.loadClass.style.display = "block";
      this.loadSprite.animateFrame(this.loaderSprite, 12, 64, 64, 12, 1, 40, true);
    }else{
      this.loadClass.style.display = "none";
      this.loadSprite.stopAnimation();
    }
  }
}
