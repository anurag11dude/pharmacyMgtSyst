import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../services/menu.service';
/* import { List } from '../../utilities/list.component'; */

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  menuObj = {
    menu : [{menuName : 'Products'},{menuName : 'Sales'}],
    selected : "Products"
  };

  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Products"){
          this.menuObj.selected = data.tab;
        }
      }
    )
  }

}
