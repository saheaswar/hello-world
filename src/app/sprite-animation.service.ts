import { Injectable } from '@angular/core';

let that;

@Injectable()
export class SpriteAnimationService {
  private spriteInterval;
  constructor() { that = this;}

  animateFrame( element,
                        totalFrames: Number,
                        elementWidth,
                        elementHeight,
                        numberOfRow,
                        numberOfColumn,
                        animationSpeed: Number,
                        loopAnimation:Boolean
                      ){

    let count = 0;
    let posL = 0;
    let posT = 0;
    var firstTime = false;
    
    let len = element.length;
    this.spriteInterval = setInterval(
      function(){
        count++;
        if(count <= totalFrames){
          if(count == 1){
            if(len == undefined){
              element.style.backgroundPosition = "0px 0px";
            }else{
              for(let i=0; i<len;i++){
                element[i].style.backgroundPosition = "0px 0px";
              }
            }
            
          }else{
            if((count % numberOfRow) != 0){
              posL -= elementWidth
            }else{
              posL = 0;
              posT -= elementHeight;
            }
            if(len == undefined){
              element.style.backgroundPosition = posL+"px "+posT+"px";
            }else{
              for(let i=0; i<len;i++){
                element[i].style.backgroundPosition = posL+"px "+posT+"px";
              }
            }
          }
        }else{
          count = 0;
          posL = 0;
          posT = 0;

          if(loopAnimation){
            element.style.backgroundPosition = "0px 0px";
          }else{
            clearInterval(that.spriteInterval);
          }
        }
      }, animationSpeed
    )
  }

  stopAnimation(){
    clearInterval(this.spriteInterval);
  }
}
