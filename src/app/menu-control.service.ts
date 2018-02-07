
import { Injectable } from '@angular/core';
import { NavigatorControlService } from './navigator-control.service';
import { PagedetailService } from './pagedetail.service';
import { TweenMax } from 'gsap';

declare var $: any;

let that;
let pageCnt = 0;

@Injectable()
export class MenuControlService {

  private menuData;
  private menuDetails;
  private menuBtn;
  private menuPopup;
  private menuContainer;
  private menuContent;
  private menuClose;
  private accordContainer;
  private subAccordContainer;
  private toggleMenuBtn;
  private menuLevel_2;
  private pageBtn;
  private subModuleHeight = [];
  private subPageHeight  = [];
  private currentLevelArr = [];

  pageDetailsArr = [];
  levelPagesArr = [];
  totalPages = -1;
  currentPage = -1;
  constructor(private navigator: NavigatorControlService, private navDetails: PagedetailService) {that = this;}

  getMenuData(url){
    this.menuData = this.navDetails.callData(url);
    this.menuData.subscribe(result => this.getMenuDetails(result));
  }

  getMenuDetails(mDetails){
    this.menuDetails = mDetails;
    this.initMenuElements();
    this.controlMenuBtn();
    this.createMenu();
  }

  initMenuElements(){
    this.menuPopup = document.getElementById("f_menuPopup");
    this.menuContainer = document.getElementById("f_menuContainer");
    this.menuContent = document.getElementById("f_menuContent");
    this.menuBtn = document.getElementById("f_menuBtn");
    this.menuClose = document.getElementById("f_menuClose");


    $('#f_menuContent').enscroll({
        verticalTrackClass: 'menuTrack',
        verticalHandleClass: 'menuHandle'
    })
  }

  controlMenuBtn(){
    this.navigator.multipleListener(this.menuBtn, "addListener", "click mouseenter mouseleave", this.fnShowMenu);
    this.navigator.multipleListener(this.menuClose, "addListener", "click mouseenter mouseleave", this.fnHideMenu);
  }

  private fnShowMenu(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :      that.menuPopup.style.display = "block";
                          that.menuContainer.style.display = "block";
                          TweenMax.to(that.menuContainer, 0.2, {css:{scale:1}})
                          that.navigator.showHideGadgets(false);
                          that.updateCompletedStatus();
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


  private fnHideMenu(e){
    let eventType = e.type;
    switch(eventType){
      case "click" :     TweenMax.to(that.menuContainer, 0.2, {css:{scale:0}, onComplete: () => {
                            that.menuContainer.style.display = "none";
                            that.menuPopup.style.display = "none";
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

  private updateCompletedStatus(){
    this.getPageDetails();
    let pageCnt = 0;
    let pageId;
    let getStatusClass;
    let courseBtnId;
    let getCourseStatusClass;
    let moduleId;
    let getModuleStatusId;
	for(let l=0;l<this.navDetails.visitedArray.length -1;l++){
        pageId = document.getElementById("f_pageId_"+l);
		if(this.navDetails.visitedArray[l]==1){
            for(let i=0; i<pageId.children.length;i++){
                if(pageId.children[i].classList.contains('f_statusBar')){
                    getStatusClass = pageId.children[i];
                }
            }
            getStatusClass.style.backgroundColor = "#ADFDCE";
		}
	}
	
	for (var i = 0; i < this.menuDetails.length; i++) {
		var levelOneCnt = 0;
        if (this.menuDetails[i].module.URL != '#') {
			pageCnt++;
			if(this.navDetails.visitedArray[pageCnt-1]==1){
				levelOneCnt++;
			}
        } else {
            for (var j = 0; j < this.menuDetails[i].module.page.length; j++) {
                if (this.menuDetails[i].module.page[j].URL != '#') {
					pageCnt++;
					if(this.navDetails.visitedArray[pageCnt-1]==1){
						levelOneCnt++;
					}
                } else {
					var levelTwoCnt = 0;
                    for (var k = 0; k < this.menuDetails[i].module.page[j].subpage.length; k++) {
						pageCnt++;
						if(this.navDetails.visitedArray[pageCnt-1]==1){
							levelOneCnt++;
							levelTwoCnt++;
						}
                    }
                    courseBtnId = document.getElementById("f_courseBtn_"+i+"_"+j);
                    for(let i=0; i<courseBtnId.children.length;i++){
                        if(courseBtnId.children[i].classList.contains('f_statusBar')){
                            getCourseStatusClass = courseBtnId.children[i];
                        }
                    }
					if(this.menuDetails[i].module.page[j].subpage.length == levelTwoCnt){
                        getCourseStatusClass.style.backgroundColor = "#ADFDCE";
					}else{
						if(levelTwoCnt!=0){
                            getCourseStatusClass.style.backgroundColor = "#FFFF8F";
						}
					}
                }
            }
        }
        
        moduleId = document.getElementById("f_moduleToggle_"+i);
        if(moduleId != null){
            for(let i1=0; i1<moduleId.children.length;i1++){
                if(moduleId.children[i1].classList.contains('f_statusBar')){
                    getModuleStatusId = moduleId.children[i1];
                }
            }
        }

		if(this.levelPagesArr[i]==levelOneCnt){
            getModuleStatusId.style.backgroundColor = "#ADFDCE";
		}else{
			if(levelOneCnt!=0){
                getModuleStatusId.style.backgroundColor = "#FFFF8F";
			}
		}
    }
    this.showMenuTab();
  }

  getPageDetails() {
    let pageBtn = document.getElementsByClassName("f_pageBtn");
    let getPageId = document.getElementById("f_pageId_"+(this.navDetails.currentPage - 1));

    for(let i1=0; i1<pageBtn.length;i1++){
        let childLen = pageBtn[i1].children.length;
        for(let i2=0; i2<childLen;i2++){
            if(pageBtn[i1].children[i2].classList.contains('f_menuText')){
                let getModuleStatusId = pageBtn[i1].children[i2];
                getModuleStatusId.classList.remove("f_pageInprogressText");
            }
        }
    }
 
    for(let j1=0; j1<getPageId.children.length; j1++){
        if(getPageId.children[j1].classList.contains('f_menuText')){
            let getModuleStatusId = getPageId.children[j1];
            getModuleStatusId.classList.add("f_pageInprogressText");
        }
    }
    
    let currentViewingPage = document.getElementById("f_pageId_"+(this.navDetails.currentPage - 1));
    
    currentViewingPage.removeEventListener('click', this.menuPageClicked, false);
    currentViewingPage.style.cursor = "default";
    
    if(this.navDetails.visitedArray[this.navDetails.currentPage - 1] == 1 && this.navDetails.currentPage < this.navDetails.visitedArray.length){
        this.pageBtn[this.navDetails.currentPage].addEventListener('click', this.menuPageClicked, false);
        this.pageBtn[this.navDetails.currentPage].style.cursor = "pointer";
    }

    for (let i = 0; i < this.pageDetailsArr.length; i++) {
        for (let j = 0; j < this.pageDetailsArr[i].level.length; j++) {
            let levelone = -1;
            let leveltwo = -1;
            let levelthree = -1;
            let levels = "-1";
            let pageId = -1;
            let levelSplit = this.pageDetailsArr[i].level[j].split('_');
            levelone = parseInt(levelSplit[0]);
            leveltwo = parseInt(levelSplit[1]);
            levelthree = parseInt(levelSplit[2]);

            levels = String(levelSplit[3]);

            pageId = parseInt(levelSplit[5]) - 1;

            this.currentLevelArr = [];
            this.currentLevelArr.push(levelone);
            this.currentLevelArr.push(leveltwo);
            this.currentLevelArr.push(levelthree);
        }
    }
  }

  showMenuTab() {
    let levelOne = this.currentLevelArr[0];
    let levelTwo = this.currentLevelArr[1] - 1;
    let levelThree = this.currentLevelArr[2] - 1;

    
    if (levelTwo != -1) {
        let id = levelOne;
        let _this = document.getElementById('f_moduleToggle_' + id);
        _this.setAttribute('value', 'toggle');
        for(let j1=0; j1<_this.children.length; j1++){
            if(_this.children[j1].classList.contains('f_openClose')){
                let getModuleStatusId = _this.children[j1];
                getModuleStatusId.classList.remove("menuPlusIcon");
                getModuleStatusId.classList.add("menuMinusIcon");
            }
        }
        let accCont = document.getElementById("f_accordContainer_"+id);
        accCont.style.display = "block";
        
        setTimeout(function() {
            let getChildHeight;
            let childOuterHeight;
            for(let j1=0; j1<accCont.children.length; j1++){
                if(accCont.children[j1].classList.contains('f_accordContainer')){
                    getChildHeight = accCont.children[j1];
                    childOuterHeight = getChildHeight.clientHeight;
                }
            }
            accCont.style.height = childOuterHeight+"px";
            getChildHeight.style.marginTop = "0px";
        }, 50)
    }

    if (levelThree != -1) {
        let _thisDiv = document.getElementById('f_courseBtn_' + levelTwo + '_' + levelThree);
        _thisDiv.setAttribute('value', 'toggle');
        for(let j1=0; j1<_thisDiv.children.length; j1++){
            if(_thisDiv.children[j1].classList.contains('f_openClose')){
                let getModuleStatusId = _thisDiv.children[j1];
                getModuleStatusId.classList.remove("menuPlusIcon");
                getModuleStatusId.classList.add("menuMinusIcon");
            }
        }
        let subAccCont = document.getElementById("f_subAccordContainer_"+ levelOne + '_' + levelTwo);
        subAccCont.style.display = "block";

        setTimeout(function() {
            let getChildHeight;
            let childOuterHeight;
            let accCont = document.getElementById("f_accordContainer_"+levelOne);
            for(let j1=0; j1<subAccCont.children.length; j1++){
                if(subAccCont.children[j1].classList.contains('f_level_2_container')){
                    getChildHeight = subAccCont.children[j1];
                    childOuterHeight = getChildHeight.clientHeight;
                }
            }
            subAccCont.style.height = childOuterHeight+"px";
            accCont.style.height = "auto";
            getChildHeight.style.marginTop = "0px";
        }, 50)
    }
  }

  private createMenu(){
   
    let moduleToggleFlg = false;
    let pageToggleFlg = false;
    
    for (var i = 0; i < this.menuDetails.length; i++) {
      var pagesCnt = 0;
      if (this.menuDetails[i].module.URL != '#') {
        pagesCnt++;
        this.navDetails.visitedArray.push(0);
        this.createModule(i);
      } else {
        moduleToggleFlg = true;
        this.createModulePage(i);
        for (var j = 0; j < this.menuDetails[i].module.page.length; j++) {
            if (this.menuDetails[i].module.page[j].URL != '#') {
                pagesCnt++;
                this.navDetails.visitedArray.push(0);
                this.creatPage(i, j);
            } else {
                pageToggleFlg = true;
                this.createSubPageContainer(i, j);
                for (var k = 0; k < this.menuDetails[i].module.page[j].subpage.length; k++) {
                    pagesCnt++;
                    this.navDetails.visitedArray.push(0);
                    this.createSubPage(i, j, k);
                }
            }
        }
      }
      this.levelPagesArr.push(pagesCnt)
    }
    
    this.totalPages = pageCnt;
    
    this.toggleMenuBtn = document.getElementsByClassName("f_toggleMenuBtn");
    this.menuLevel_2 = document.getElementsByClassName("f_menuLevel_2");
    this.pageBtn = document.getElementsByClassName("f_pageBtn");
    if(moduleToggleFlg){
        for (var i = 0; i < this.toggleMenuBtn.length; i++) {
            this.toggleMenuBtn[i].addEventListener('click', this.moduleToggleClicked, false);
        }
    }
    
    if(pageToggleFlg){
        for (var i = 0; i < this.menuLevel_2.length; i++) {
            this.menuLevel_2[i].addEventListener('click', this.pageToggleClicked, false);
        }
    }
    if(!this.navigator.mediaControl.strictNavigation){
        for (var i = 0; i < this.pageBtn.length; i++) {
            this.pageBtn[i].addEventListener('click', this.menuPageClicked, false);
        }
    }else{
        for (var i = 0; i < this.pageBtn.length; i++) {
            if(this.navDetails.visitedArray[i] == 1){
                this.pageBtn[i].addEventListener('click', this.menuPageClicked, false);
                this.pageBtn[i].style.cursor = "pointer";
            }else{
                this.pageBtn[i].removeEventListener('click', this.menuPageClicked, false);
                this.pageBtn[i].style.cursor = "default";
            }
        }
    }
  }
  
  private createModule(moduleNo){
    pageCnt++;
    let menuPageBtn = document.createElement('button');

    menuPageBtn.id = "f_pageId_"+ (pageCnt - 1);
    menuPageBtn.classList.add("f_menuLevel_1", "f_pageBtn");
    menuPageBtn.setAttribute("title", this.menuDetails[moduleNo].module.heading);
    menuPageBtn.innerHTML = '<span class="f_statusBar"></span><span class= "f_menuText">' + this.menuDetails[moduleNo].module.heading + '</span>';

    this.menuContent.appendChild(menuPageBtn);

    this.pageDetailsArr.push({ level: [moduleNo+'_'+-1+'_'+-1+'_levelone'+'_pageId_'+pageCnt]});
  }

  private createModulePage(moduleNo){
    let menuModuleBtn = document.createElement('button');
    let accordionContainer = document.createElement('div');

    menuModuleBtn.setAttribute("value", "notToggle");
    menuModuleBtn.id = "f_moduleToggle_" + moduleNo;
    menuModuleBtn.classList.add("f_toggleMenuBtn", "f_menuLevel_1");
    menuModuleBtn.innerHTML = '<span class="f_statusBar"></span><span class= "f_menuText">' + this.menuDetails[moduleNo].module.heading + '</span><span class="f_openClose menuPlusIcon"></span>';

    this.menuContent.appendChild(menuModuleBtn);

    accordionContainer.id = "f_accordContainer_" + moduleNo;
    accordionContainer.innerHTML = '<div class="f_accordContainer"></div>';
    accordionContainer.style.overflow = "hidden";
    
    this.menuContent.appendChild(accordionContainer);
    
    this.pageDetailsArr.push({ level: []});
    this.accordContainer = document.getElementById("f_accordContainer_" + moduleNo);
    this.accordContainer.children[0].innerHTML = '';
  }

  private creatPage(moduleNo, pageNo){
    pageCnt++;
    let menuPageBtn1 = document.createElement('button');
    menuPageBtn1.id = "f_pageId_" + (pageCnt - 1);
    menuPageBtn1.classList.add("f_menuLevel_2", "f_pageBtn");
    menuPageBtn1.innerHTML = '<span class="f_statusBar"></span><span class="f_menuText">' + this.menuDetails[moduleNo].module.page[pageNo].heading + '</span>';

    this.accordContainer.children[0].innerHTML += this.getHTML(menuPageBtn1, true);

    this.pageDetailsArr[moduleNo].level.push(moduleNo+'_'+pageNo+'_'+-1+'_leveltwo'+'_pageId_'+pageCnt);
    TweenMax.to(this.accordContainer, 0.3, {css:{'marginTop': -(this.accordContainer.clientHeight)}});

    this.accordContainer.style.height = "0px";
    this.accordContainer.style.display = "none";
  }

  private createSubPageContainer(moduleNo, pageNo){
    let menuCourseBtn = document.createElement('button');
    let subAccord = document.createElement('div');

    menuCourseBtn.id = 'f_courseBtn_' + moduleNo + '_' + pageNo;
    menuCourseBtn.classList.add("f_menuLevel_2");
    menuCourseBtn.innerHTML = '<span class="f_statusBar"></span><span class="f_menuText">' + this.menuDetails[moduleNo].module.page[pageNo].heading + '</span><span class="f_openClose menuPlusIcon"></span>';
    this.accordContainer.children[0].innerHTML += this.getHTML(menuCourseBtn, true);

    subAccord.id = 'f_subAccordContainer_' + moduleNo + '_' + pageNo;
    subAccord.classList.add("f_subAccordContainer");
    subAccord.innerHTML = '<div class="f_level_2_container"></div>';
    subAccord.style.overflow = "hidden";

    this.accordContainer.children[0].innerHTML += this.getHTML(subAccord, true);
    
    this.subAccordContainer = document.getElementById('f_subAccordContainer_' + moduleNo + '_' + pageNo);
    this.subAccordContainer.children[0].innerHTML = '';
    
  }

  private createSubPage(moduleNo, pageNo, subPageNo){
    pageCnt++;
    let menuSubPage = document.createElement('button');

    menuSubPage.id = "f_pageId_" + (pageCnt - 1);
    menuSubPage.classList.add("f_menuLevel_3", "f_pageBtn");
    menuSubPage.innerHTML = '<span class="f_statusBar"></span><span class= "f_menuText">' + this.menuDetails[moduleNo].module.page[pageNo].subpage[subPageNo].heading + '</span>';

    this.subAccordContainer.children[0].innerHTML += this.getHTML(menuSubPage, true);

    this.pageDetailsArr[moduleNo].level.push(moduleNo+'_'+pageNo+'_'+subPageNo+'_levelthree'+'_pageId_'+pageCnt);
  
    this.subAccordContainer.style.height = "0px";
    this.subAccordContainer.style.display = "none";
   
  }

  getHTML(who, deep){
    if(!who || !who.tagName) return '';
    var txt, ax, el= document.createElement("div");
    el.appendChild(who.cloneNode(false));
    txt= el.innerHTML;
    if(deep){
        ax= txt.indexOf('>')+1;
        txt= txt.substring(0, ax)+who.innerHTML+ txt.substring(ax);
    }
    el= null;
    return txt;
  }

  indexInClass(node, myClass, myClassName) {
    let num = 0;

    for (let i = 0; i < myClass.length; i++) {
        if (myClass[i].parentNode === node) {
            return num;
        }
        num++;
    }
    return -1;
  }

  private moduleToggleClicked(evt){
    let getClass;
    let accCont;
    let getId = (evt.currentTarget.id).split('_');
    let id = parseInt(getId[2]);
    if (evt.currentTarget.value == 'toggle') {
        evt.currentTarget.setAttribute('value', 'notToggle');
        for(let i=0; i<evt.currentTarget.children.length;i++){
            if(evt.currentTarget.children[i].classList.contains('f_openClose')){
                getClass = document.getElementsByClassName(evt.currentTarget.children[i].classList.item(0));
            }
        }
        getClass[that.indexInClass(evt.currentTarget, getClass, "f_openClose")].classList.remove("menuMinusIcon");
        getClass[that.indexInClass(evt.currentTarget, getClass, "f_openClose")].classList.add("menuPlusIcon");
        accCont = document.getElementById('f_accordContainer_' + id);
        TweenMax.to(accCont, 0.3, {'height':0, onComplete: () => {
            accCont.style.display = "none";
        }});
        TweenMax.to(accCont.children, 0.3, {'marginTop': -(accCont.children.clientHeight)});
    } else {
        evt.currentTarget.setAttribute('value', 'toggle');
        for(let i=0; i<evt.currentTarget.children.length;i++){
            if(evt.currentTarget.children[i].classList.contains('f_openClose')){
                getClass = document.getElementsByClassName(evt.currentTarget.children[i].classList.item(0));
            }
        }
        getClass[that.indexInClass(evt.currentTarget, getClass, "f_openClose")].classList.add("menuMinusIcon");
        getClass[that.indexInClass(evt.currentTarget, getClass, "f_openClose")].classList.remove("menuPlusIcon");
        accCont = document.getElementById('f_accordContainer_' + id);
        accCont.style.display = "block";
        TweenMax.to(accCont, 0.3, {'height': accCont.children[0].clientHeight});
        TweenMax.to(accCont.children[0], 0.3, {css:{'marginTop': 0}});
    }
  }

  private pageToggleClicked(evt){
    let getClass;
    let accCont;
    let subAccCont;
    let getId = (evt.currentTarget.id).split('_')
    let moduleId = parseInt(getId[2]);
    let pageId = parseInt(getId[3]);

    if (evt.currentTarget.value == 'toggle') {
        evt.currentTarget.setAttribute('value', 'notToggle');
        for(let i=0; i<evt.currentTarget.children.length;i++){
            if(evt.currentTarget.children[i].classList.contains('f_openClose')){
                getClass = document.getElementsByClassName(evt.currentTarget.children[i].classList.item(0));
            }
        }
        
        getClass[that.indexInClass(evt.currentTarget, getClass, "f_openClose")].classList.remove("menuMinusIcon");
        getClass[that.indexInClass(evt.currentTarget, getClass, "f_openClose")].classList.add("menuPlusIcon");

        subAccCont = document.getElementById('f_subAccordContainer_' + moduleId + '_' + pageId);

        TweenMax.to(subAccCont, 0.3, {'height': 0, onComplete: () => {
            subAccCont.style.display = "none";
        }})
        
        accCont = document.getElementById('f_accordContainer_' + moduleId);
        accCont.style.display = "block";
        TweenMax.to(subAccCont.children, 0.3, {css:{'marginTop': -(subAccCont.children.clientHeight)}});
        TweenMax.to(accCont, 0.3, {'height': "auto"});
    } else {
        evt.currentTarget.setAttribute('value', 'toggle');
        for(let i=0; i<evt.currentTarget.children.length;i++){
            if(evt.currentTarget.children[i].classList.contains('f_openClose')){
                getClass = document.getElementsByClassName(evt.currentTarget.children[i].classList.item(0));
            }
        }
        
        if(getClass != undefined){
            getClass[that.indexInClass(evt.currentTarget, getClass, "f_openClose")].classList.add("menuMinusIcon");
            getClass[that.indexInClass(evt.currentTarget, getClass, "f_openClose")].classList.remove("menuPlusIcon");
            subAccCont = document.getElementById('f_subAccordContainer_' + moduleId + '_' + pageId);
            subAccCont.style.display = "block";
            TweenMax.to(subAccCont, 0.3, {'height': subAccCont.children[0].clientHeight});
            
            accCont = document.getElementById('f_accordContainer_' + moduleId);
            accCont.style.height = "auto";
            
            TweenMax.to(subAccCont.children[0], 0.3, {css:{'marginTop':0}});
        }

    }
  }

  private menuPageClicked(evt){
    var getId = (evt.currentTarget.id).split('_');
    var id = parseInt(getId[2]);
      that.navDetails.currentPage = Number(id + 1);

      TweenMax.to(that.menuContainer, 0.2, {css:{scale:0}, onComplete: () => {
        that.menuContainer.style.display = "none";
        that.menuPopup.style.display = "none";
        that.navigator.enableDisableCc();
        that.navigator.enableDisableTranscript();
        that.navigator.getTranscriptText(that.navDetails.currentPage - 1);
        that.navigator.navigatePage(1, that.navDetails.currentPage)
      }});
  }
}
