import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Tab } from 'src/app/utilities/menuTemplate';
import { List } from 'src/app/utilities/listTemplate';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  menuObj = new Tab().Dashboard;
  public tableData = new List();
  public sanitization:DomSanitizer;
  public customClass: string = 'accord';
  public lastStock = {};

  constructor(public menuService:MenuService, private route:ActivatedRoute) { 
    
    let tab = this.route.snapshot.queryParams.tab;
    console.log(tab);
    if(!tab) {
      this.handleRouterNavig(this.menuObj.selected);
    }else{
      this.menuObj.selected = this.menuObj.menu.find((elem)=>{
        return elem.menuName == tab;
      })
      this.handleRouterNavig(tab);
    }
    this.menuService.menuMsg.subscribe(
    data => {
      this.menuObj.selected = data.tab;
      if(data.nav == "Dashboard"){
        this.menuObj.selected = data.tab;
        console.log(this.menuObj.selected);
        this.handleRouterNavig(this.menuObj.selected.menuName);
      }
    })
  }

  handleRouterNavig(tab){
    console.log(tab);
    switch(tab){
      case "Welcome":
      //this.displayProduct();
      this.init();
      break;
      case "Store":
      //this.displayProduct();
      break;
    }
  }

  ngOnInit() {
    this.init();
  }
  init(){
    this.sortzeroStockProducts();
    this.sortIndebtedCustomers();
    this.displayLastSale();
  }
  autoNav(_route){
    if(_route.menu != 'dashboard'){
      this.menuService.AutoNavigation(_route);
    }
    else{
      this.menuObj.selected = this.menuObj.menu.find((elem)=>{
        return elem.menuName == _route.tab;
      });
      this.handleRouterNavig(this.menuObj.selected.menuName);
    }
  }
  sortzeroStockProducts(){
    this.displayZeroStockProducts(()=>{
      let zerostock = this.tableData.zeroStockProducts.data.filter((elem)=>{
        return elem.stock == 0;
      });
      this.tableData.zeroStockProducts.data = zerostock || [];
    })
  }
  sortIndebtedCustomers(){
    this.displayIndebtedCustomers(()=>{
      let indebt = this.tableData.indebtedCustomers.data.filter((elem)=>{
        return elem.outstanding_balance > 0;
      });
      indebt.sort((a, b)=>{
        return b.outstanding_balance - a.outstanding_balance;
      })
      this.tableData.indebtedCustomers.data = indebt || [];
      console.log(this.tableData.indebtedCustomers.data);
    })
  }
  displayZeroStockProducts(callback = function(){}){
    this.postCall({table: 'products'}, 'zeroStockProducts', callback);
  }
  displayLastSale(callback = ()=>{}){
    this.postCall({table: 'customerinvoice'}, 'transactionHistory', ()=>{
      this.lastStock = this.tableData.transactionHistory.data.reduce((max,elem)=>{
      return parseInt(elem.id) > max.id && parseInt(elem.totalamt) > 0 ? elem : max;
    },{id: 0});
      console.log(this.lastStock['invno']);
      this.postCall({table: 'sales', col: ['invoiceno'], val: [this.lastStock['invno']], signs: ['=']}, 'lastSales', callback);
    });
  }
  displayIndebtedCustomers(callback = function(){}){
    this.postCall({table: 'customers'}, 'indebtedCustomers', callback);
  }
  postCall(payload, type, callback, action = 'select_operation', classtype = ''){
    let thisComp = this;
    this.menuService.jsonPost({
      act : action,
      arg : {
        data: payload,
        classname: classtype
      },
      sess : 'ewere'
    }).then((result)=>{
      console.log(result);
      if(result.status != "SUCCESS"){
        thisComp.tableData[type].changeData([]);
        callback();
      } else{
        thisComp.tableData[type].changeData(result.data);
        callback();
      }
    })
  }

}
