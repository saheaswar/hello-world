import { Component, OnInit, AfterContentInit } from '@angular/core';
import { PageloaderService } from '../../pageloader.service';
@Component({
  selector: 'app-page-1',
  templateUrl: './page-2.component.html',
  styleUrls: ['./page-2.component.css']
})
export class Page2Component implements OnInit, AfterContentInit {
  loadingInterval: any;
  constructor( private loaderService: PageloaderService) { }
  
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
  }

  assignImges(){
    for(let i=0; i<this.loaderService.imgArray.length; i++){
      let assignImg = document.getElementById("image_"+i);
      assignImg.setAttribute("src",this.loaderService.imgPath+this.loaderService.imgArray[i].name);
      assignImg.setAttribute("alt",this.loaderService.imgArray[i].altText);
      assignImg.setAttribute("title",this.loaderService.imgArray[i].altText);
    }
  }
}
