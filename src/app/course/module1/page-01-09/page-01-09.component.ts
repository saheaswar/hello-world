import { Component, OnInit, ViewChild } from '@angular/core';
import { DdDragDropAppropriateDirective } from './../../../dd-drag-drop-appropriate.directive';

@Component({
  selector: 'app-page-01-09',
  templateUrl: './page-01-09.component.html',
  styleUrls: ['./page-01-09.component.css']
})
export class Page0109Component implements OnInit {
  @ViewChild(DdDragDropAppropriateDirective) ddDragDropAppropriate = null;
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
    this.question = ["drag 1","drag 2","drag 3","drag 4","drag 5"];
  }
  onSubmitHandler()
  {
    this.ddDragDropAppropriate.checkAnswer();
  }

}
