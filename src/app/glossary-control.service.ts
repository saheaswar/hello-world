import { Injectable } from '@angular/core';
import { NavigatorControlService } from './navigator-control.service';
import { PagedetailService } from './pagedetail.service';
import { TweenMax } from 'gsap';

declare var $: any;

let that;
@Injectable()
export class GlossaryControlService {
 
  private glossaryData;
  private glossaryDetails;
  private glossarySelectedLetter = 0;
  private glossarySelectedWord = 0;
  private glossaryView;
  private glossaryBtn;
  private glossaryCloseBtn;
  private glossaryPopup;
  private glossaryContainer;
  private glossaryCol1;
  private glossaryCol2;
  private getContainsClass = [];

  constructor(private navigator: NavigatorControlService, private navDetails: PagedetailService) {that = this;}
  
  getGlossaryData(url){
    this.glossaryData = this.navDetails.callData(url);
    this.glossaryData.subscribe(result => this.getGlossaryDetails(result));
  }
  
  getGlossaryDetails(gDetails){
    this.glossaryDetails = gDetails;
    this.initGlossaryElements();
    this.controlGlossaryBtn();
    this.createGlossary();
  }

  initGlossaryElements(){
    this.glossaryBtn = document.getElementById("f_glossaryBtn");
    this.glossaryCloseBtn = document.getElementById("f_glossaryClose");
    this.glossaryPopup = document.getElementById("f_glossaryPopup");
    this.glossaryContainer = document.getElementById("f_glossaryContainer");
    this.glossaryCol1 = document.getElementById("f_glossaryCol1");
    this.glossaryCol2 = document.getElementById("f_glossaryCol2");

    $('#f_glossaryCol1').enscroll({
        verticalTrackClass: 'glossaryTrack',
        verticalHandleClass: 'glossaryHandle'
    })
    $('#f_glossaryCol2').enscroll({
        verticalTrackClass: 'glossaryTrack',
        verticalHandleClass: 'glossaryHandle'
    })
    $('#f_glossaryCol3').enscroll({
        verticalTrackClass: 'glossaryTrack',
        verticalHandleClass: 'glossaryHandle'
    })
  }

  controlGlossaryBtn(){
    this.navigator.multipleListener(this.glossaryBtn, "addListener", "click mouseenter mouseleave", this.fnShowGlossary);
    this.navigator.multipleListener(this.glossaryCloseBtn, "addListener", "click mouseenter mouseleave", this.fnHideGlossary);
  }

  createGlossary() {
    let gCOl1Ul = document.createElement("ul");
    let gCOl1Li;
    let gCOl1Button;
    let getButton;

    for (var i = 0; i < this.glossaryDetails.length; i++) {
      gCOl1Li = document.createElement("li");
      gCOl1Button = document.createElement("button");
      gCOl1Button.setAttribute("type", "button");
      gCOl1Button.id = "alphabet_" + i;
      gCOl1Button.classList.add("f_glossaryLetter");
      gCOl1Button.innerHTML = this.glossaryDetails[i].letter;
      gCOl1Button.style.cursor = "default"; 
      gCOl1Li.appendChild(gCOl1Button);
      gCOl1Li.id = "list1_"+i;
      gCOl1Ul.appendChild(gCOl1Li);
      this.glossaryCol1.appendChild(gCOl1Ul);
      
      getButton = document.getElementById("alphabet_"+i);
      if (this.glossaryDetails[i].keywords.length > 0) {
        getButton.classList.add("glossaryEnabled");
      }
      
      if(getButton.classList.contains("glossaryEnabled")){
        this.getContainsClass[i] = getButton;
      }else{
        this.getContainsClass[i] = "";
      }
    }
    
    for(let a=0;a<this.getContainsClass.length; a++){
      if(this.getContainsClass[a] != ""){
        this.getContainsClass[a].addEventListener("click", this.showGlossaryWords);
      }
    }
    
    this.createGlossaryWords();
  }

  createGlossaryWords() {
    let getSelectedButton;
    let gCOl2Ul = document.createElement("ul");
    let gCOl2Li;
    let gCOl2Button;
    let getSelectedWord;
    let getClickableButton;

    for(let a=0;a<this.getContainsClass.length; a++){
      if(this.getContainsClass[a] != ""){
        this.getContainsClass[a].style.cursor = "pointer";
        this.getContainsClass[a].classList.remove('selected');
        this.getContainsClass[a].addEventListener("click", this.showGlossaryWords);
      }
    }
    
    getSelectedButton = document.querySelector("#f_glossaryCol1 ul li:nth-child("+(this.glossarySelectedLetter + 1)+") button");
    getSelectedButton.classList.add("selected");
    getSelectedButton.style.cursor = "default";
    getSelectedButton.removeEventListener("click", this.showGlossaryWords);
    
    this.glossaryCol2.removeChild(this.glossaryCol2.firstChild);

    this.glossaryCol2.appendChild(gCOl2Ul);

    for (let i = 0; i < this.glossaryDetails[this.glossarySelectedLetter].keywords.length; i++) {
      gCOl2Li = document.createElement("li");
      gCOl2Button = document.createElement("button");
      gCOl2Button.setAttribute("type", "button");
      gCOl2Button.id = "word_" + i;
      gCOl2Button.classList.add("f_glossaryWord");
      gCOl2Button.innerHTML = this.glossaryDetails[this.glossarySelectedLetter].keywords[i].word;
      gCOl2Li.appendChild(gCOl2Button);
      gCOl2Li.id = "word1_"+i;
      gCOl2Ul.appendChild(gCOl2Li);
      this.glossaryCol2.appendChild(gCOl2Ul);
    }

    getSelectedWord = document.getElementById('word_' + this.glossarySelectedWord);
    getSelectedWord.classList.add("selected");
    
    getClickableButton = document.querySelector(".f_glossaryWord");
    getClickableButton.addEventListener("click", this.clickGlossaryWord);
    
    this.showGlossaryDescription()
  }

  showGlossaryDescription() {
    let getClickableButton = document.getElementsByClassName("f_glossaryWord");
    let getSelectedWord = document.getElementById('word_' + this.glossarySelectedWord);
    let getTitleText = document.getElementById('f_g_heading');
    let getDiscText = document.getElementById('f_g_description');

    for(let a=0; a<getClickableButton.length;a++){
      let getGwordId = getClickableButton[a].id;
      let getElement = document.getElementById(getGwordId);
      getElement.classList.remove("selected");
      getElement.style.cursor = "pointer";
      getElement.addEventListener("click", this.clickGlossaryWord);
    }
    
    getSelectedWord.classList.add("selected");
    getSelectedWord.style.cursor = "default";
    getSelectedWord.removeEventListener("click", this.clickGlossaryWord);

    getTitleText.innerHTML = '<p>' + this.glossaryDetails[this.glossarySelectedLetter].keywords[this.glossarySelectedWord].word + '</p>';
    getDiscText.innerHTML = '<p>' + this.glossaryDetails[this.glossarySelectedLetter].keywords[this.glossarySelectedWord].description + '</p>';
  }

  showGlossaryWords(e) {
    that.glossarySelectedLetter = parseInt((e.currentTarget.id).split('_')[1])
    that.glossarySelectedWord = 0
    that.createGlossaryWords();
  }

  clickGlossaryWord(e) {
    that.glossarySelectedWord = parseInt((e.currentTarget.id).split('_')[1]);
    that.showGlossaryDescription();
  }

  private fnShowGlossary(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      that.glossaryPopup.style.display = "block";
                          that.glossaryContainer.style.display = "block";
                          TweenMax.to(that.glossaryContainer, 0.2, {css:{scale:1}})
                          that.navigator.showHideGadgets(false);
                          if(that.navigator.mediaControlForOtherClass.mediaFile != undefined){
                            if(that.navigator.mediaControlForOtherClass.playState != "replay"){
                                that.navigator.mediaControlForOtherClass.pauseAudio();
                            }
                          }
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }


  private fnHideGlossary(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      TweenMax.to(that.glossaryContainer, 0.2, {css:{scale:0}, onComplete: () => {
                            that.glossaryContainer.style.display = "none";
                            that.glossaryPopup.style.display = "none";
                            if(that.navigator.mediaControlForOtherClass.mediaFile != undefined){
                              if(that.navigator.mediaControlForOtherClass.playState != "replay"){
                                if(that.navigator.mediaControlForOtherClass.playState == "play"){
                                  that.navigator.mediaControlForOtherClass.playAudio();
                                }else if(that.navigator.mediaControlForOtherClass.playState == "pause"){
                                  that.navigator.mediaControlForOtherClass.pauseAudio();
                                }
                              }
                            }
                          }})
                          break;
      case "mouseenter" :
                          break;
      case "mouseleave" :
                          break;
    }
  }
}
