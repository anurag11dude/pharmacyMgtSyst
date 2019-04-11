import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { List } from 'src/app/utilities/listTemplate';
import { Tab } from 'src/app/utilities/menuTemplate';
import { search } from 'src/app/utilities/customPipes';
import { CustomerModalContent } from './modals.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity:0, display: 'none'})),
      transition('void => *', animate("300ms 300ms")),
      transition('* => void', animate("100ms")),
    ])
  ]
})
export class CustomersComponent implements OnInit {

  menuObj = new Tab().Customers;
  public tableData = new List();
  public grow:boolean = false;
  public authen = window['user']['auth'];
  
  constructor(public menuService:MenuService, private modalService: BsModalService, private route:ActivatedRoute) {
    console.log(window['user']['auth']);
    let tab = this.route.snapshot.queryParams.tab;
    console.log(this.menuObj,tab);
    if(!tab) {
      this.handleRouterNavig(this.menuObj.selected.menuName);
    }else{
      this.menuObj.selected = this.menuObj.menu.find((elem)=>{
        return elem.menuName == tab;
      });
      this.handleRouterNavig(tab);
      this.handleAction(this.route.snapshot.queryParams.action);
    }
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Customers"){
          this.menuObj.selected = data.tab;
          
          this.handleRouterNavig(this.menuObj.selected.menuName);
        }
      }
    );
   }
   handleAction(action){
    switch(action){
      case 'addCustomer':
      this.openModal({size: 'md', name:'addCustomer', data: this.tableData.products.selected[0]});
      break;
      case 'payDebt':
      setTimeout(()=>{
        alert('Select a Customer and click the bouncing button on the right menu');
      }, 1500);
      this.grow = true;
      break;
    }
   }
  handleRouterNavig(tab){
    console.log(tab);
    switch(tab){
      case "Customers":
      this.displayCustomer();
      break;
      default:
      if (this.authen['customers'] !== false) {
        this.displayCustomer();
      }
      break;
    }
  }

  ngOnInit() {

  }
  activateSelectMode(list){
    let selmode = this.tableData[list].multiSelect;
    this.tableData.falsify(['customers', 'invoices', 'sales'], 'multiSelect');
    selmode ? this.tableData.falsify([list], 'multiSelect') : this.tableData.truthify([list], 'multiSelect');
    this.tableData.falsify([list], 'selected');
  }
  customersListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'customers')) {
      this.tableData.falsify(['customers'], 'selected'); return;
    }
    this.tableData.falsify(['invoices', 'sales'], 'selected');
    this.displayInvoice();
  }
  invoicesListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'invoices')) {
      this.tableData.falsify(['invoices'], 'selected'); return;
    }
    this.tableData.invoices.selected[0]['oldoutbal'] =  parseInt(this.tableData.invoices.selected[0]['totalpaid']) + parseInt(this.tableData.invoices.selected[0]['outbalance']) - parseInt(this.tableData.invoices.selected[0]['totalamt']);
    this.tableData.falsify(['sales'], 'selected');
  }
  salesListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'sales')) {
      this.tableData.falsify(['sales'], 'selected'); return;
    }   
  }
  invoicesListDblSelected(selectedTable){
    if(this.tableData.invoices.selected[0].invno == 'debtpay') return;
    console.log(this.tableData.invoices.selected[0]);
    //if(!this.selectAnyRow(selectedTable, 'stocks')) return;
    this.tableData.truthify(['invoices'], 'dblselected');
    let thisComp = this;
    this.displaySale(function(){
      const Search = new search();
      thisComp.tableData.sales.data.map((elem)=>{
        elem.description = Search.transform(thisComp.tableData.products.data, elem.product)[0].product_description;
      })
    });
  }
  deleteRows(selectedRow, classtype){
    if(!confirm("Are you sure you want to delete the selection")) return;
    console.log(selectedRow);
    this.postCall(selectedRow, '', function(){}, 'delete_operation', classtype);
  }
  selectAnyRow(selectedTable, type){
    if(selectedTable.row.length == 0) return false;
    if(typeof this.tableData[type].selected === "boolean")
    this.tableData.truthify([type], 'selected');
    this.tableData[type].selected = selectedTable.row;
    return true;
  }
  openModal(_data) {
    let thisComp = this;
    const initialState = {
      data : _data,
      callback : function(){
        thisComp.resetTableSelections(thisComp);
      }
    };
    const modalRef = this.modalService.show(CustomerModalContent, {initialState});
    modalRef.setClass(`modal-${_data.size} modal-dialog-centered`);
    
  }
  resetTableSelections(thisComp) {
    thisComp.displayCustomer(
    thisComp.displayInvoice(
    thisComp.displaySale(
    )));
  }
  displayCustomer(callback = function(){}){
    this.postCall({table: 'customers'}, 'customers', callback);
  }
  displayInvoice(callback = function(){}){
    if(!this.tableData.customers.selected) return;
    let id = this.tableData.customers.selected[0]['customer_name'];
    this.postCall({table: 'customerInvoice', col: ['customer'], val: [id], signs: ['=']}, 'invoices', callback);
    this.postCall({table: 'products'}, 'products', callback);
  }
  displaySale(callback = function(){}){
    console.log(this.tableData.invoices.dblselected);
    if(this.tableData.invoices.dblselected == false) return;
    let invno = this.tableData.invoices.selected[0]['invno'];
    this.postCall({table: 'sales', col: ['invoiceno'], val: [invno], signs: ['=']}, 'sales', callback);
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
