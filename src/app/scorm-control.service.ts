import { Injectable } from '@angular/core';
import { ScormWrapperService } from 'ngx-scorm-wrapper'

@Injectable()
export class ScormControlService {

  constructor(private scorm:ScormWrapperService) { }
  
  isScorm(){
    this.scorm.setAPIVersion("1.2");
    return this.scorm.doLMSInitialize();
  }
}
