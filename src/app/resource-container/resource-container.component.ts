import { Component, OnInit } from '@angular/core';
import { ResourceControlService } from './../resource-control.service';

@Component({
  selector: 'resource-container',
  templateUrl: './resource-container.component.html',
  styleUrls: ['./resource-container.component.css']
})
export class ResourceContainerComponent implements OnInit {

  constructor(private rControl: ResourceControlService) { }

  ngOnInit() {
    this.rControl.getResourceData('assets/data/f_resource_text.json');
  }

}
