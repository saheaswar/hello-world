import { Component, OnInit } from '@angular/core';
import { GlossaryControlService } from './../glossary-control.service';

@Component({
  selector: 'glossary-container',
  templateUrl: './glossary-container.component.html',
  styleUrls: ['./glossary-container.component.css']
})

export class GlossaryContainerComponent implements OnInit {

  constructor(private gControl: GlossaryControlService) { }

  ngOnInit() {
    this.gControl.getGlossaryData('assets/data/f_glossary_text.json');
  }

}
