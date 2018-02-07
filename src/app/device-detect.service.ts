import { Injectable } from '@angular/core';

@Injectable()
export class DeviceDetectService {

  constructor() { }

  android() {
		return navigator.userAgent.match(/Android/i) ? true : false;
  }
  
  blackBerry() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
  }
  
  iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod|Mac/i) ? true : false;
  }
  
  windows() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
  }
  
  androidPhone() {
		let userAgent = navigator.userAgent.toLowerCase();
		if((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1))
		{
			return true;
		}
		else
		{
			return false;
		}
  }
  
  androidTablet() {
		var userAgent = navigator.userAgent.toLowerCase();
		if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1))
		{
			return true;
		}
		else
		{
			return false;
		}
  }
  
  iPhone() {
		return navigator.userAgent.match(/iPhone/i) ? true : false;
  }
  
  iPad() {
		return navigator.userAgent.match(/iPad/i) ? true : false;
  }
  
  mobileDevice(){
		return this.androidPhone() || this.iPhone() ? true : false;
  }
  
  fireFox(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? true : false;
	}
}
