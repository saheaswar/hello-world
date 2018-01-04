import { TweenMax } from 'gsap';
import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';

import { PageloaderService } from '../../pageloader.service';
import { ScrollbarComponent } from 'ngx-scrollbar';

@Component({
  selector: 'app-page-1',
  templateUrl: './page-1.component.html',
  styleUrls: ['./page-1.component.css']
})



export class Page1Component implements OnInit, AfterContentInit {
  loadingInterval: any;
  textCount = 0;
  constructor( private loaderService: PageloaderService) { }
  @ViewChild(ScrollbarComponent) scrollRef: ScrollbarComponent;
  ngOnInit() {
    this.loaderService.loadedAllImages = false;
    this.loaderService.showHideLoaderAnim(true);
    this.loaderService.getPageNo();
  }

  ngAfterContentInit(){
    this.loadingInterval = setInterval(() =>{
      if(this.loaderService.loadedAllImages){
        this.assignImges();
        this.startCourse();
      }
    },40);
    
  }

  startCourse(){
    clearInterval(this.loadingInterval);
    this.loaderService.showHideLoaderAnim(false);
    this.assignTexts();
    let imageAnim = document.getElementById("image_0");
    TweenMax.to(imageAnim, .4, {
      color: 'white',
      rotation: 720
    });
  }

  assignTexts(){
    let textBlockLen = this.loaderService.textConfig.length
    if(textBlockLen > 0){
      if(this.textCount < textBlockLen){
        let no = this.textCount;
        let getParentElm = document.getElementById("textContent_"+no);
        let getTextSyles = this.loaderService.textConfig[no]["textBlock"][0]["textStyle"];
        let contentLen = this.loaderService.textConfig[no]["textBlock"][1]["contents"].length;
        for(let key in getTextSyles){
          getParentElm.style[key] = getTextSyles[key];
        }
        for(let i1 = 0; i1< contentLen; i1++){
          let addText = this.loaderService.textConfig[no]["textBlock"][1]["contents"][i1].content;
          document.getElementsByClassName("ng-scrollbar-view")[no].innerHTML += '<p id="para_'+i1+' class= "paraClass">'+addText+'</p>';
          this.scrollRef.update();
        }
        this.textCount++;
        this.assignTexts();
      }
       
    }
  }
  assignImges(){
    let imgLen = this.loaderService.imgArray.length;
    for(let i=0; i<imgLen; i++){
      let assignImg = document.getElementById("image_"+i);
      assignImg.setAttribute("src",this.loaderService.imgPath+this.loaderService.imgArray[i].name);
      assignImg.setAttribute("alt",this.loaderService.imgArray[i].altText);
      assignImg.setAttribute("title",this.loaderService.imgArray[i].altText);
    }
  }
}
