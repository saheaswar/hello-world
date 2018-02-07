import { Component, OnInit, ViewChild } from '@angular/core';
import { DdDragDropOneToOneDirective } from './../../../dd-drag-drop-one-to-one.directive';

@Component({
  selector: 'app-page-01-08',
  templateUrl: './page-01-08.component.html',
  styleUrls: ['./page-01-08.component.css']
})
export class Page0108Component implements OnInit {
  @ViewChild(DdDragDropOneToOneDirective) ddDragDropOneToOne = null;
  //
  private pageContent;
  private question;
  //
  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.init();
    }, 50)
  }

  init()
  {
    this.question = ["Drag 1","Drag 2","Drag 3","Drag 4"]; //this.pageContent.question;

  }

  onSubmitHandler()
  {
    this.ddDragDropOneToOne.checkAnswer();
  }
}
