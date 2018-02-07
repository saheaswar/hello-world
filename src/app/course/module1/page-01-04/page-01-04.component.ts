import { SpriteAnimationService } from './../../../sprite-animation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-01-04',
  templateUrl: './page-01-04.component.html',
  styleUrls: ['./page-01-04.component.css']
})
export class Page0104Component implements OnInit {

  constructor(private sprite: SpriteAnimationService) { }

  ngOnInit() {
    let manElm = document.getElementById("man");
    let manElmCLass = document.getElementsByClassName("manCls");
    this.sprite.animateFrame(manElm, 80, 200, 258, 8, 10, 40, true);
    this.sprite.animateFrame(manElmCLass, 80, 200, 258, 8, 10, 40, false);
  }

} 
