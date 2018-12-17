import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import {MenuService} from './services/menu.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarnav = {
    navig: {
      activeNav: "Dashboard",
      navs: [
        {name: "Dashboard",iconClass: "home",route: ""},
        {name: "Products",iconClass: "prescription-bottle-alt",route: "products"},
        {name: "Customers",iconClass: "users",route: "customers"},
        {name: "Records",iconClass: "history",route: "records"},
        {name: "Settings",iconClass: "cog",route: "settings"}
      ]
    },
    menuicon : {
      toggled:false
    },
  };
  showMenu:boolean;
  menuObj = {menu:[], selected:''};

  constructor(public menuService:MenuService, private _electronService: ElectronService){

  }

  activateNav() : void{
    //this._electronService.shell.openExternal('http://www.google.com');
  }
  public createMenu(menuObj){
    this.menuObj = menuObj;
    this.showMenu = this.menuObj.menu.length < 2 ? true : false;
    console.log(this.menuObj.menu.length > 1);
  }
  public selectMenu(menu){
    this.menuObj.selected = menu.menuName;
    this.menuService.sendMenu({nav:this.sidebarnav.navig.activeNav, tab : menu.menuName});
  }
}
