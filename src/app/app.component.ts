//import { PagesComponent } from './pages/pages.component';
import { JsondataService } from './jsondata.service';
import { Component, OnInit, Injectable } from '@angular/core';
import TweenMax from 'gsap'; 

let id, myBtn, myData;
@Component({
  selector: 'main-container',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Pro';
  pageCount = 1;
  constructor(private jsonservice: JsondataService){}

  ngOnInit(){
    var myPage = document.getElementById("container");
    console.log(myPage);
    console.log(myPage.childNodes.length);
    for(let i=0; i<myPage.childNodes.length; i++){
      console.log(i, myPage.childNodes[i]);
     // myPage.removeChild(myPage.childNodes[i]);
    }
    callAlert();
    this.jsonservice.jsonData("assets/data/ipdata.json")
      .subscribe(result => this.getJsonData(result));
  }

  getJsonData(res){
    myData = res;
  }
}

function callAlert(){
  /* id = document.getElementById("test");
  myBtn = document.getElementById("test_btn");


  myBtn.addEventListener("click", (e) =>{
    console.log(myData.iplData[0].iplMatches, e.type);
    TweenMax.to(myBtn, .4, {
      scale: '2',
      color: 'white',
      rotation: 720
    }); */
  });

  /* myBtn.onclick = (e) =>{
      console.log(myData.iplData[0].iplMatches);
      TweenMax.to(myBtn, .4, {
        scale: '2',
        color: 'white',
        rotation: 720
    });
  } */
}
