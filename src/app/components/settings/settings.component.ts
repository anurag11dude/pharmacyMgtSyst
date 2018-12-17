import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  menuObj = {
    menu : [{menuName : 'Overview'},{menuName : 'Sales'}],
    selected : "Sales"
  };

  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Settings"){
          this.menuObj.selected = data.tab;
        }
      }
    )
  }

}
