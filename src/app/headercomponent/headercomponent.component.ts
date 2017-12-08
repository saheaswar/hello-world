import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'headers',
  templateUrl: './headercomponent.component.html',
  styleUrls: ['./headercomponent.component.css']
})
export class HeadercomponentComponent implements OnInit {
  headTitle = "SAMPLE PROJECT"
  constructor() { }

  ngOnInit() {
      let id = document.getElementsByTagName("headers");
      console.log(id);
  }

}
