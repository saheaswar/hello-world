import { Injectable } from '@angular/core';
import { JsondataService } from './jsondata.service';
import { PagedetailService } from './pagedetail.service';

@Injectable()
export class PageloaderService {
  private loadClass = document.getElementById('loaderBlock');
  private pageJsonData;
  public imgPath;
  public imgArray;
  public textConfig;
  private imgCount = 0;
  private textCount = 0;
  loadedAllImages = false;
  constructor(private pageData:JsondataService, private getPageDetails:PagedetailService,){}
  
  getPageNo(){
    this.pageJsonData = this.callPageData('assets/data/pages/page-'+this.getPageDetails.currentPage+'.json');
    this.pageJsonData.subscribe(result => this.getPageJsonDetails(result));
  }

  callPageData(aUrl){
    return this.pageData.jsonData(aUrl);
  }

  getPageJsonDetails(data){
    this.imgCount = 0;
    this.textCount;
    this.imgPath = data.imagepath;
    this.imgArray = data.images;
    this.textConfig = data.texts;
    this.loadImage();
  }

  loadImage(){
    if(this.imgArray.length != 0){
      if(this.imgCount < this.imgArray.length){
        let img = new Image();
        let aUrl = this.imgPath + this.imgArray[this.imgCount].name;
        img.src = aUrl;
        img.onload = () => {
          if(img.complete){
            this.imgCount++;
            this.loadImage();
          }
        }
      }else{
        this.loadedAllImages = true;
      }
    }else{
      this.loadedAllImages = true;
    }
  }

  showHideLoaderAnim(lFlag){
    if(lFlag){
      this.loadClass.style.display = "block";
    }else{
      this.loadClass.style.display = "none";
    }
  }
}
