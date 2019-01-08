import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity:0, display: 'none'})),
      transition('void => *', animate("300ms 300ms")),
      transition('* => void', animate("100ms")),
    ])
  ]
})
export class ProductsComponent implements OnInit {

  menuObj = {
    menu : [{menuName : 'Products'},{menuName : 'Sales'}],
    selected : "Products"
  };
  public tableData = {
    products: {
      map:[
        {name: "Product", body: "product_name", width:"w-25"},
        {name: "Description", body: "product_description", width:"w-25"},
        {name: "Stock", body: "stock", width:"w-10"},
        {name: "Retail", body: "product_retailprice", width:"w-10"},
        {name: "Wholesale", body: "product_wholesaleprice", width:"w-10"},
        {name: "C.ExpDate", body: "expiry_date", width:"w-20"}
      ]
    },
    stocks: {
      map:[
        {name: "Expiry", body: "expirydate", width:"w-25"},
        {name: "Stk. Bgt", body: "stockbought", width:"w-25"},
        {name: "Stk. Sold", body: "stocksold", width:"w-25"},
        {name: "Stk. Left", body: "stockremain", width:"w-25"}
      ]
    },
    stockentry: {
      map:[
        {name: "Entry", body: "entry_date", width:"w-35"},
        {name: "Stock", body: "stockno", width:"w-30"},
        {name: "SalesRef", body: "byadmin", width:"w-35"}
      ]
    }
  }
  selectMode:any = {
    products : false,
    stocks : false,
    stockentry : false,
  };
  public selected:any = {
    products : false,
    stocks : false,
    stockentry : false,
  };
  public dblselected:any = {
    stocks : false,
  };

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
      this.tableData.products["data"] = result;
    })
  }
  activateSelectMode(list){
    let selmode = this.selectMode[list];
    Object.keys(this.selectMode).forEach(element => {
      this.selectMode[element] = false;
    });
    this.selectMode[list] = selmode ? false : true;
    this.selected[list] = false;
  }
  productsListSelected(params){
    if(params[1].length == 0) return;
    if(typeof this.selected['products'] === "boolean")
    this.selected['products'] = {};
    this.selected['products'] = params[1];
    this.dblselected.stocks = false;
    let id = this.selected.products[0]['product_name'];
    this.menuService.getData(`/api/stock/id?productname=${encodeURI(id)}`).then((result)=>{
      //console.log(result);
      this.tableData.stocks["data"] = result;
    });
  }
  stocksListSelected(params){
    if(params[1].length == 0) return;
    if(typeof this.selected['stocks'] === "boolean")
    this.selected['stocks'] = {};
    this.selected['stocks'] = params[1];
  }
  stockentryListSelected(params){
    if(params[1].length == 0) return;
    if(typeof this.selected['stockentry'] === "boolean")
    this.selected['stockentry'] = {};
    this.selected['stockentry'] = params[1];    
  }
  stockListDblSelected(params){
    if(params[1].length == 0) return;
    if(typeof this.selected[params[0]] === "boolean")
    this.selected[params[0]] = {};

    this.selected[params[0]] = params[1];
    
    let name = this.selected.stocks[0]['productname'];
    let exp = this.selected.stocks[0]['expirydate'];
    let url = `/api/stockentry/id?product=${encodeURI(name)}&stockexpiry_date=${encodeURI(exp)}`;
    this.menuService.getData(url).then((result)=>{
      this.dblselected.stocks = true
      //console.log(result);
      this.tableData.stockentry["data"] = result;
    });
  }
}
