import { Component, OnInit, ViewChild } from '@angular/core';
import { DdDragDropType1Directive } from './../../../dd-drag-drop-type1.directive';

@Component({
  selector: 'app-page-01-07',
  templateUrl: './page-01-07.component.html',
  styleUrls: ['./page-01-07.component.css']
})
export class Page0107Component implements OnInit {
  @ViewChild(DdDragDropType1Directive) ddDragDropType1 = null
  //
  private pageContent;
  //private question;
  private question1;
  private question2;
  private question3;
  //
  private answer1;
  private answer2;
  private answer3;
  //
  private isSubmitDisabled;
  //
  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.init();
    }, 50)
  }
  
  init()
  {
    //this.question = this.pageContent.question;
    this.question1 = 'drag Text 1'; //this.pageContent.question[0].dragText;
    this.question2 = 'drag Text 2'; //this.pageContent.question[1].dragText;
    this.question3 = 'drag Text 3'; //this.pageContent.question[2].dragText;
    //  console.log('### ', this.question[0].dragText)
    this.answer1 = 'drop Text 1'; //this.pageContent.question[0].dropText;
    this.answer2 = 'drop Text 2'; //this.pageContent.question[1].dropText;
    this.answer3 = 'drop Text 3'; //this.pageContent.question[2].dropText;
    //
    //console.log('######## ',this.globalData.CourseContent.pageHeading)
  }

  onSubmitHandler()
  {
    
    this.ddDragDropType1.checkAnswer();
  }

}
