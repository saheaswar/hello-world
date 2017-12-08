import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private mainVar: AppComponent) { }

  ngOnInit() {
      console.log(this.mainVar.pageCount);
  }

}
