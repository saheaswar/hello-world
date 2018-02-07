import { Injectable } from '@angular/core';
import {TweenMax, TimelineLite} from 'gsap';

let that;

@Injectable()
export class AnimationUtilsService {

  private indicator = null
  private indicatorElm;

  constructor() { that = this; }

  startIndicatorAnimation(){
    this.indicatorElm = document.getElementById("f_nextIndicator");
    this.indicatorElm.style.display = "block";
    this.indicatorAnimation();
  }

  indicatorAnimation() {
      this.indicator = TweenMax.to(document.getElementById("f_nextIndicator"), 0.3, {
          css: {
              top: -35
          },
          ease: Linear.easeIn,
          onComplete: function() {
              TweenMax.to(document.getElementById("f_nextIndicator"), 0.3, {
                  css: {
                      top: -30
                  },
                  ease: Linear.easeIn,
                  onComplete: function() { that.indicatorAnimation(); }
              })
          }
      })
  }
  
  stopIndicatorAnimation(){
    if (this.indicator != null) {
        this.indicator.kill();
        this.indicatorElm.style.display = "none";
    }
  }

  animateFadeIn(_el, _duration) {
      TweenMax.set(_el, {
          clearProps: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(_el, _duration, {
          opacity: 1
      })
      return tl
  }
  
  animateFadeOut(_el, _duration) {
      TweenMax.set(_el, {
          clearProps: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(_el, _duration, {
          opacity: 0
      })
      return tl
  }
  
  animateFromLeft(_el, _duration, _pos) {
      TweenMax.set(_el, {
          clear: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(_el, _duration, {
          opacity: 1,
          left: _pos
      })
      return tl
  }
  
  animateFromRight(_el, _duration, _pos) {
      TweenMax.set(_el, {
          clearProps: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(_el, _duration, {
          opacity: 1,
          right: _pos + 'px'
      })
      return tl
  }
  
  animatePaddingBottom(_el, _duration, _size) {
      TweenMax.set(_el, {
          clearProps: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(_el, _duration, {
          paddingBottom: _size + 'px'
      })
      return tl
  }
  
  animateFadeInAndFadeOut(el, duration, delaytime) {
      TweenMax.set(el, {
          clearProps: 'opacity'
      })
      var tl = new TimelineLite({
          paused: true
      }).from(el, duration, {
          autoAlpha: 0
      }).to(el, duration, {
          autoAlpha: 0
      }, delaytime)
      return tl
  }
  
  animateFadeInDisplayBlock(_el, _duration) {
      TweenMax.set(_el, {
          clearProps: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(_el, _duration, {
          opacity: 1,
          display: 'block'
      })
      return tl
  }
  
  animateOutDisplayNone(el) {
      TweenMax.set(el, {
          clearProps: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(el, 1, {
          opacity: 0,
          display: 'none'
      })
      return tl
  }
  
  animateDisplayNone(el) {
      TweenMax.set(el, {
          clearProps: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(el, 0.3, {
          display: 'none'
      })
      return tl
  }
  
  animateChangeWidth(_el, _duration, _width) {
      TweenMax.set(_el, {
          clearProps: 'all'
      })
      var tl = new TimelineLite({
          paused: true
      }).to(_el, _duration, {
          width: _width
      })
      return tl
  }
}
