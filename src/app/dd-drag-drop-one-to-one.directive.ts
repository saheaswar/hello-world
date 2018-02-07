import { Directive, AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[ddDragDropOneToOne]'
})
export class DdDragDropOneToOneDirective implements AfterViewInit {
  //
  private dragCounter:number;
  public isSubmitDisabled:boolean;
  private numbers:Array<number>;
  private userAnswer:Array<number>;
  
  private currentElement;
  private correctCards:number;
  //
  constructor(private elementRef: ElementRef) {
    setTimeout(()=>{
      this.init();
    },500)
  }
  ngAfterViewInit() 
  {

  }
  init()
  {
    this.dragCounter = 0;
    this.isSubmitDisabled = true;
    this.correctCards = 0;
    this.numbers = [];
    this.userAnswer = [];
    this.currentElement = null;

    for (let i = 0; i < 4; i++) {
      let indx:number = i + 1;
      this.numbers.push(indx);
      $("#card"+(i+1)).data({'originalLeft': $("#card"+(i+1)).css('left'),
        'origionalTop': $("#card"+(i+1)).css('top')
      });
    }
    //
    $(".droppable-item").droppable({
      classes: {
        "ui-droppable-hover": "drop-hover"
      },
      accept: '.draggable-item',
      hoverClass: 'hovered',
      drop: (event, ui) => {
        //console.log(' -- ', $(event.target));        
        this.handleCardDrop(event, ui);
      }
    })
    $(".draggable-item").draggable({
      stack: '.draggable-item',
      cursor: 'move',
      revert: true,
      drag: (event, ui) => {
        this.handleCardDrag(event, ui);
      }
    })
  }
  handleCardDrag(event, ui)
  {
    this.currentElement = $(event.target);
  }
  handleCardDrop(event, ui)
  {
    $(this.currentElement).addClass("droped");
    let slotNumber = event.target.getAttribute('attr.data-number');
    let cardNumber = ui.draggable.data('number');
    ui.draggable.draggable('disable');
    $(event.target).droppable('disable');
    //ui.draggable.position({ of: $(event.target), my: 'left top', at: 'left top', using: (css, calc) => { $(event.target).animate(css, 200, 'linear'); } });
    ui.draggable.position({my: "left top", at: "left top", of: $(event.target)});
    ui.draggable.draggable('option', 'revert', false);
    if (slotNumber == cardNumber) {
      this.correctCards++;
      this.userAnswer.push(1);
    }
    else{
      this.userAnswer.push(0);
    }
    this.dragCounter++;
    if(this.dragCounter == 4)
    {
      this.isSubmitDisabled = false;
    }
  }

  checkAnswer()
  {
    $(".draggable-item").draggable('disable');
    $(".draggable-item").css("cursor","default");
    this.isSubmitDisabled = true;
  }
  
  touchHandler(event)
  {
    var touches = event.changedTouches,
    first = touches[0],
    type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              first.screenX, first.screenY, 
                              first.clientX, first.clientY, false, 
                              false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
  }
}
