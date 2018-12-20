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
  public tableData:Object = {
    map:[
      {name: "Product", body: "product_name", width:"w-25"},
      {name: "Description", body: "product_description", width:"w-25"},
      {name: "Stock", body: "stock", width:"w-10"},
      {name: "Retail", body: "product_retailprice", width:"w-10"},
      {name: "Wholesale", body: "product_wholesaleprice", width:"w-10"},
      {name: "C.ExpDate", body: "expiry_date", width:"w-20"}
    ]
  }
  selectMode:boolean = false;
  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Products"){
          this.menuObj.selected = data.tab;
        }
      }
    );
    this.menuService.getData("/api/products").then((result)=>{
      console.log(result);
      this.tableData["data"] = result;
    })
  }


}
