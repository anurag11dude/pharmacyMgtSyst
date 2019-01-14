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
  public tableData:Object = {
    map:[
      {name: "User", body: "username", width:"w-50"},
      {name: "Role", body: "category", width:"w-50"}
    ]
  }
  multiSelect:boolean = false;
  
  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Settings"){
          this.menuObj.selected = data.tab;
        }
      }
    );
    this.menuService.jsonPost("/api/users").then((result)=>{
      console.log(result);
      if(result.status != "SUCCESS") return;
      this.tableData["data"] = result.data;
    })
  }

  listSelected(params){
    console.log(params);
  }
}
