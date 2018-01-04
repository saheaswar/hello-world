import { Injectable } from '@angular/core';
import { JsondataService } from './jsondata.service';
import { ScormControlService } from './scorm-control.service';

@Injectable()
export class PagedetailService{

  public currentPage = 1;
  public getPageData;
  public totalPages = 10;

  constructor(private jsonservice: JsondataService, private myScorm:ScormControlService) {}
  
  callData(aUrl){
    return this.jsonservice.jsonData(aUrl);
  }

  getAllScormData(){
    console.log(this.myScorm.isScorm())
  }
}
