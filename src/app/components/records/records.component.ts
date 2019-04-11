import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { List } from 'src/app/utilities/listTemplate';
import { Tab } from 'src/app/utilities/menuTemplate';
import { BsModalService } from 'ngx-bootstrap';
import { RecordModalContent } from './modals.component';
import { DatePipe } from '@angular/common';
import { search } from 'src/app/utilities/customPipes';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  public menuObj = new Tab().Records;
  public tableData = new List();
  public startdate = '';
  public authen = window['user']['auth'];
  public enddate = '';
  public params:any = {
    entries: <number> 0, pos: <number> 0,
    cheque: <number> 0, cash: <number> 0,
    credit: <number> 0, paid: <number> 0,
    cost: <number> 0, outbal: <string> ''
  }
  
  constructor(public menuService:MenuService, private modalService: BsModalService, private route:ActivatedRoute) {
    let tab = this.route.snapshot.queryParams.tab;
    console.log(tab);
    if(!tab) {
      
      this.handleRouterNavig(this.menuObj.selected.menuName);
    }else{
      this.menuObj.selected = this.menuObj.menu.find((elem)=>{
        return elem.menuName == tab;
      })
      this.handleRouterNavig(tab);
    }
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Records"){
          this.menuObj.selected = data.tab;
          
          this.handleRouterNavig(this.menuObj.selected.menuName);
        }
      }
    );
  }
  handleRouterNavig(tab){
    console.log(tab);
    switch(tab){
      case "Sales":
      this.params = {
        entries: <number> 0
      }
      console.log(this.params);
      this.display('sales','saleHistory');
      break;
      case "Stocks":
      this.params = {
        entries: <number> 0
      }
      this.display('stockentry','stockHistory');
      break;
      default:
        this.params = {
          entries: <number> 0, pos: <number> 0,
          cheque: <number> 0, cash: <number> 0,
          credit: <number> 0, paid: <number> 0,
          cost: <number> 0, outbal: <string> ''
        }
        this.display('customerinvoice','transactionHistory');
      break;
    }
  }
  ngOnInit() {
  }
  listSelected(selectedTable, type, field){
    if(!this.selectAnyRow(selectedTable, type)) {
      this.tableData.falsify([type], 'selected'); return;
    }
    this.tableData[type].search = this.tableData[type].selected[0][field];
    this.search(this.tableData[type].search, type, field);
  }
  search(str, type, field){
    const Search = new search();
    let newTrans = Search.transform(this.tableData[type].data, str, field);
    let maxTrans = newTrans.reduce((max,elem)=>{
      return parseInt(elem.id) > max.id ? elem : max;
    },{id: 0});
    this.getParams(newTrans, type);
    if(this.menuObj.selected.menuName == "Transactions")
      this.params.outbal = String(str).toLowerCase() == String(maxTrans.customer).toLowerCase() ? maxTrans.outbalance : '';
    console.log(this.params, newTrans);
  }
  selectAnyRow(selectedTable, type){
    if(selectedTable.row.length == 0) return false;
    if(typeof this.tableData[type].selected === "boolean")
    this.tableData.truthify([type], 'selected');
    this.tableData[type].selected = selectedTable.row;
    return true;
  }
  clearInputs(_table, type, date, field){
    this.startdate = ''; 
    this.enddate = ''; 
    this.tableData[type].search = '';
    this.tableData.falsify([type], 'selected');
    this.fetchdata(_table, type, date, field);
  }
  openModal(_data) {
    const initialState = {
      data : _data,
      callback : function(){}
    };
    const modalRef = this.modalService.show(RecordModalContent, {initialState});
    modalRef.setClass(`modal-${_data.size} modal-dialog-centered`);
  }
  
  fetchdataOpenModal(_data, table, type, date, field){
    let search = this.tableData[type].search;
    console.log(search);
    this.fetchdata(table, type, date, field, ()=>{
      _data['data'] = {
        dateInterval: {
          start_date: this.startdate , 
          end_date: this.enddate
        }, 
        selected : search, 
        params:this.params, 
        info: this.tableData[type].data
      }
      this.openModal(_data);
      console.log(search);
      console.log(this.tableData[type].data);
    })
  }

  display(_table, type, callback = function(){}){
    let thisComp = this;
    console.log(type);
    this.postCall({table: _table}, type, function(){
      thisComp.getParams(thisComp.tableData[type].data, type);
    });
    
  }
  postCall(payload, type, callback, override = false, action = 'select_operation', classtype = ''){
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
      if(result.status != "SUCCESS"){
        thisComp.tableData[type].changeData([],override);
        callback();
      } else{
        thisComp.tableData[type].changeData(result.data,override);
        callback();
      }
    })
  }

  fetchdata(_table, type, date, field, callback = ()=>{}){
    let thisComp = this;
    if(this.startdate == '' || this.enddate == ''){
      this.postCall({table: _table}, type, function(){
        //thisComp.tableData[type].search = "";
        console.log(thisComp.tableData[type].data);
        thisComp.getParams(thisComp.tableData[type].data, type);
        thisComp.search(thisComp.tableData[type].search, type, field);
        callback();
      }, true);
      return;
    }
    const datePipe = new DatePipe('en-US');
    this.startdate = datePipe.transform(this.startdate, 'yyyy-MM-dd');
    this.enddate = datePipe.transform(this.enddate, 'yyyy-MM-dd');

    this.postCall({table: _table, col: [date, date], val: [this.startdate, this.enddate], signs: [">=","<="]}, type, function(){
      //thisComp.tableData[type].search = "";
      console.log(thisComp.getParams(thisComp.tableData[type].data, type));
      thisComp.search(thisComp.tableData[type].search, type, field);
      callback();
    });
  }
  getParams(data, type){
    switch(type){
      case "transactionHistory":
        this.params.paid = 0;
        this.params.cost = 0;
        this.params.pos = 0;
        this.params.cheque = 0;
        this.params.cash = 0;
        this.params.outbal = '';
        this.params.entries = data.length;
        data.forEach((elem)=>{
          this.params[String(elem.paymeth).toLowerCase()] += elem.totalpaid;
          this.params.paid += elem.totalpaid;
          this.params.cost += elem.totalamt;
        });
      break;
      case "saleHistory":
        this.params.entries = data.length;
      break;
      case "stockHistory":
        this.params.entries = data.length;
      break;
    }
    
    return this.params;
  }
}
