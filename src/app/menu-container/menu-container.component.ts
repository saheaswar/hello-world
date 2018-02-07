
import { Component, OnInit } from '@angular/core';
import { MenuControlService } from '../menu-control.service';

@Component({
  selector: 'menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css']
})

export class MenuContainerComponent implements OnInit {

  constructor(private mControl: MenuControlService) { }

  ngOnInit() {
    this.mControl.getMenuData('assets/data/f_menu_config.json');
  }

}
