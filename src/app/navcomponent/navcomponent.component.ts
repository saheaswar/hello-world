
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigatorControlService } from './../navigator-control.service';

@Component({
  selector: 'footers',
  templateUrl: './navcomponent.component.html',
  styleUrls: ['./navcomponent.component.css']
})

export class NavcomponentComponent implements OnInit {

  constructor(
    private navigator:NavigatorControlService,
  ) {}
  
  ngOnInit() {
    this.navigator.getCourseData('assets/data/courseDetails.json');
  }

}
