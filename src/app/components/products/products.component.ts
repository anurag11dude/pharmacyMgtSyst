import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { List } from 'src/app/utilities/listTemplate';
import { Tab } from 'src/app/utilities/menuTemplate';
import { ProductModalContent } from './modals.component';
import { ActivatedRoute } from '@angular/router';

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

  public menuObj = new Tab().Products;
  public tableData = new List();
  public grow:boolean = false;
  public authen = window['user']['auth'];

  constructor(public menuService:MenuService, private modalService: BsModalService, private route:ActivatedRoute) {
    let tab = this.route.snapshot.queryParams.tab;
    console.log(this.menuObj);
    if(!tab) {
      this.handleRouterNavig(this.menuObj.selected.menuName);
    }else{
      this.menuObj.selected = this.menuObj.menu.find((elem)=>{
        return elem.menuName == tab;
      })
      this.handleRouterNavig(tab);
      this.handleAction(this.route.snapshot.queryParams.action);
    }
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Products"){
          this.menuObj.selected = data.tab;
          
          this.handleRouterNavig(this.menuObj.selected.menuName);
        }
      }
    );
   }
   handleAction(action){
    switch(action){
      case 'addProduct':
      this.openModal({size: 'md', name:'addProduct', data: this.tableData.products.selected[0]});
      break;
      case 'addStock':
      setTimeout(()=>{
        alert('Select a product and click the bouncing button on the left menu');
      }, 1500);
      this.grow = true;
      break;
    }
   }
   handleRouterNavig(tab){
    console.log(tab);
    switch(tab){
      case "Products":
      this.displayProduct();
      break;
    }
  }
  ngOnInit() {
   /*  this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Products"){
          this.menuObj.selected = data.tab;
        }
      }
    );
    this.displayProduct(); */
  }
  activateSelectMode(list){
    let selmode = this.tableData[list].multiSelect;
    this.tableData.falsify(['products', 'stocks', 'stockentry'], 'multiSelect');
    selmode ? this.tableData.falsify([list], 'multiSelect') : 
    this.tableData.truthify([list], 'multiSelect');
    this.tableData.falsify([list], 'selected');
  }
  productsListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'products')) {
      this.tableData.falsify(['products'], 'selected'); return;
    }
    this.tableData.falsify(['stocks', 'stockentry'], 'selected');
    this.displayStock();
  }
  stocksListSelected(selectedTable){
    console.log("selected");
    if(!this.selectAnyRow(selectedTable, 'stocks')) {
      this.tableData.falsify(['stocks'], 'selected'); return;
    }
    this.tableData.falsify(['stockentry'], 'selected');
  }
  stockentryListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'stockentry')) {
      this.tableData.falsify(['stockentry'], 'selected'); return;
    }   
  }
  stocksListDblSelected(selectedTable){
    console.log("dblselected");
    this.tableData.truthify(['stocks'], 'dblselected');
    this.displayStockentry();
  }
  selectAnyRow(selectedTable, type){
    if(selectedTable.row.length == 0) return false;
    if(typeof this.tableData[type].selected === "boolean")
    this.tableData.truthify([type], 'selected');
    this.tableData[type].selected = selectedTable.row;
    return true;
  }
  deleteRows(selectedRow, classtype){
    if(classtype == 'StockEntry' && selectedRow.length == this.tableData.stockentry.data.length){
      alert('cannot delete last stockentry else this stock will sieze to exist, delete the stock instead');
      return;
    }
    if(!confirm("Are you sure you want to delete the selection")) return;
    this.postCall(selectedRow, '', function(){}, 'delete_operation', classtype);
  }
  openModal(_data) {
    let thisComp = this;
    const initialState = {
      data : _data,
      callback : function(){
        thisComp.resetTableSelections(thisComp);
      }
    };
    const modalRef = this.modalService.show(ProductModalContent, {initialState});
    modalRef.setClass(`modal-${_data.size} modal-dialog-centered`);
    
  }
  resetTableSelections(thisComp) {
    thisComp.displayProduct(
    thisComp.displayStock(
    thisComp.displayStockentry(
    )));
  }
  displayProduct(callback = function(){}){
    this.postCall({table: 'products'}, 'products', callback);
  }
  displayStock(callback = function(){}){
    if(!this.tableData.products.selected) return;
    let id = this.tableData.products.selected[0]['product_name'];
    this.postCall({table: 'stock', col: ['productname'], val: [id], signs: ['=']}, 'stocks', callback);
  }
  displayStockentry(callback = function(){}){
    console.log(this.tableData.stocks.dblselected);
    if(this.tableData.stocks.dblselected == false) return;
    let name = this.tableData.stocks.selected[0]['productname'];
    let exp = this.tableData.stocks.selected[0]['expirydate'];
    this.postCall({table: 'stockentry', col: ['product', 'stockexpiry_date'], val: [name, exp], signs: ['=']}, 'stockentry', callback);
  }
  postCall(payload, type, callback, action = 'select_operation', classtype = ''){
    let thisComp = this;
    this.menuService.jsonPost({
      act : action,
      arg : {
        data: payload,
        classname: classtype
      },
      sess : window['user']['username']
    }).then((result)=>{
      console.log(result);
      if(action == 'delete_operation'){
        thisComp.resetTableSelections(this);
        return;
      }
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
