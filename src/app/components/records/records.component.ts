import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  menuObj = {
    menu : [{menuName : 'Overview'},{menuName : 'Sales'}],
    selected : "Overview"
  };

  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Records"){
          this.menuObj.selected = data.tab;
        }
      }
    )
  }

}
