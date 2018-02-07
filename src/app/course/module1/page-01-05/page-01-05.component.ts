import { Component, OnInit } from '@angular/core';
import { TweenMax } from 'gsap';

let tl;

@Component({
  selector: 'app-page-01-05',
  templateUrl: './page-01-05.component.html',
  styleUrls: ['./page-01-05.component.css']
})
export class Page0105Component implements OnInit {

  title = 'app';
  state = 'topRight';

  constructor() { }

  ngOnInit() {
    
  }
  myMove() {
    var elem = document.getElementById("redGraph");
    document.getElementById("mybtn").style.display = "none";
    TweenMax.to(elem, 1, {left:"22px", onComplete: this.showText});
  }

  showText(){
    var textElem = document.getElementById("mytext");
    textElem.style.display = "table";
  }
}
