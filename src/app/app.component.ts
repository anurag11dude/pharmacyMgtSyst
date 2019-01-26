import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MenuService } from './services/menu.service'
import { Router } from '@angular/router';
import { List } from './utilities/listTemplate';

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
        { name: "Dashboard", iconClass: "home", route: "", popTemplate: `<a>hello</a>` },
        { name: "Products", iconClass: "prescription-bottle-alt", route: "products", popTemplate: `` },
        { name: "Customers", iconClass: "users", route: "customers", popTemplate: `` },
        { name: "Records", iconClass: "history", route: "records", popTemplate: `` },
        { name: "Settings", iconClass: "cog", route: "settings", popTemplate: `` }
      ]
    },
    menuicon: {
      toggled: false
    },
  };
  showMenu: boolean;
  menuObj = { menu: [], selected: '' };
  public tableData = new List();
  public company = '';

  constructor(public menuService: MenuService, private _electronService: ElectronService, public router: Router) {
    this.menuService.AutoNavig.subscribe(
      data => {
        let nav = this.sidebarnav.navig.navs.find((elem) => {
          return String(elem.name).toLowerCase() == String(data.menu).toLowerCase()
        });
        this.activateNav(nav);
        this.router.navigate([`/${data.menu}`], { queryParams: { tab: data.tab, action: data.action } })
        //this.selectMenu(this.menuObj.menu[1]);
      })
      this.menuService.settingChange.subscribe(
        data => {
          console.log(data);
          this.company = data.company;
        }
      )
    let thisComp = this;
    this.displaySetting(() => {
      this.tableData.general.data.forEach((elem) => {
        if (elem.prop == 'company') thisComp.company = elem.value;
      });


    });
  }

  activateNav(nav): void {
    this.sidebarnav.navig.activeNav = nav.name;
  }
  public createMenu(menuObj) {
    this.menuObj = menuObj;
    this.showMenu = this.menuObj.menu.length < 2 ? true : false;
    console.log(this.menuObj.menu);
    //this.selectMenu(this.menuObj.selected);
  }
  public selectMenu(menu) {
    this.menuObj.selected = menu;
    this.menuService.sendMenu({ nav: this.sidebarnav.navig.activeNav, tab: menu });
    console.log(menu);
  }

  displaySetting(callback = () => { }) {
    let thisComp = this;
    this.menuService.jsonPost({
      act: "select_operation",
      arg: {
        data: { table: 'settings' },
        classname: ''
      },
      sess: 'ewere'
    }).then((result) => {
      if (result.status != "SUCCESS") {
        thisComp.tableData['general'].changeData([]);
        callback();
      } else {
        thisComp.tableData['general'].changeData(result.data);
        callback();
      }
    })
  }
}
