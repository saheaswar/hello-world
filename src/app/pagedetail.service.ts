import { Injectable } from '@angular/core';
import { JsondataService } from './jsondata.service';

@Injectable()
export class PagedetailService{

  public currentPage = 1;
  public getPageData;
  public totalPages = 10;
  public moduleNo = 1;
  public visitedArray = [];
  
  constructor(private jsonservice: JsondataService) {}
  
  callData(aUrl){
    return this.jsonservice.jsonData(aUrl);
  }

}
