
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-page-01-06',
  templateUrl: './page-01-06.component.html',
  styleUrls: ['./page-01-06.component.css']
})


export class Page0106Component implements OnInit {
  title = 'myProject';
  col1;
  col2;
  col3;
  constructor() { }

  ngOnInit() {
    
  }

  myFun(event){
    this.col1 = document.getElementById("a1");
    this.col2 = document.getElementById("a2");
    this.col3 = document.getElementById("a3");
  
  if(event.target.id == "v1"){
    console.log("hi1");
    this.col1.style.display = "block";
    this.col2.style.display = "none";
    this.col3.style.display = "none";
  } else if(event.target.id == "v2"){
    console.log("hi2");
    this.col1.style.display = "none";
    this.col2.style.display = "block";
    this.col3.style.display = "none";
  } else if(event.target.id == "v3"){
    console.log("hi3");
    this.col1.style.display = "none";
    this.col2.style.display = "none";
    this.col3.style.display = "block";
  }
  } 
  closeFun(event){
    this.col1.style.display = "none";
    this.col2.style.display = "none";
    this.col3.style.display = "none";
  }
}
