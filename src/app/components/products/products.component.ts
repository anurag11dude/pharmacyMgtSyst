import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { ModalService } from '../../services/modal.service';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModels } from 'src/app/utilities/model';
import { List } from 'src/app/utilities/listTemplate';
import { Tab } from 'src/app/utilities/menuTemplate';

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

  menuObj = new Tab().Products;
  public tableData = new List();

  constructor(public menuService:MenuService, private modalService: ModalService) { }

  ngOnInit() {
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Products"){
          this.menuObj.selected = data.tab;
        }
      }
    );
    this.displayProduct();
  }
  activateSelectMode(list){
    let selmode = this.tableData[list].multiSelect;
    for(let type in this.tableData)this.tableData[type].multiSelect = false;
    this.tableData[list].multiSelect = selmode ? false : true;
    this.tableData[list].selected = false;
  }
  productsListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'products')) return;
    this.tableData.stocks.dblselected = false;
    this.tableData.stocks.selected = false;
    this.tableData.stockentry.selected = false;
    this.displayStock();
  }
  stocksListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'stocks')) return;
    this.tableData.stockentry.selected = false;
  }
  stockentryListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'stockentry')) return;   
  }
  stockListDblSelected(selectedTable){
    console.log("dblselected");
    if(!this.selectAnyRow(selectedTable, 'stocks')) return;
    this.tableData.stocks.dblselected = true;
    this.displayStockentry();
  }
  selectAnyRow(selectedTable, type){
    if(selectedTable.row.length == 0) return false;
    if(typeof this.tableData[type].selected === "boolean")
    this.tableData[type].selected = {};
    this.tableData[type].selected = selectedTable.row;
    return true;
  }
  deleteRows(selectedRow, classtype){
    if(!confirm("Are you sure you want to delete the selection")) return;
    let thisComp = this;
    this.menuService.jsonPost("/server/pharmacy/getlist.php",{
      act : 'delete_operation',
      arg : {
        data: selectedRow,
        classname: classtype
      },
      sess : 'ewere'
    }).then((result)=>{
      console.log(result);
      thisComp.resetTableSelections(thisComp);
    })
  }
  openModal(data) {
    const modalRef = this.modalService.open(NgbdModalContent, {size: data.size, windowClass: 'custom-show', centered: true});
    let thisComp = this;
    modalRef.componentInstance.defineInput(data, function(){
      thisComp.resetTableSelections(thisComp);
    });
  }
  resetTableSelections(thisComp) {
    thisComp.displayProduct((prod)=>{
      thisComp.displayStock((stock)=>{
        thisComp.displayStockentry((entry)=>{
        });
      });
    });
  }
  displayProduct(callback = function(selectedRow){}){
    this.menuService.jsonPost("/server/pharmacy/getlist.php",{
      act : 'select_operation',
      arg : {
        table: 'products'
      },
      sess : 'ewere'
    }).then((result)=>{
      console.log(result);
      if(result.status != "SUCCESS"){
        this.tableData.products.changeData([]);
        callback(false);
      } else{
        this.tableData.products.changeData(result.data);
        callback(false);
      }
    })
  }
  displayStock(callback = function(selectedRow){}){
    if(!this.tableData.products.selected) return;
    let id = this.tableData.products.selected[0]['product_name'];
    this.menuService.jsonPost("/server/pharmacy/getlist.php",{
      act : 'select_operation',
      arg : {
        table: 'stock',
        col: ['productname'],
        val: [id],
        signs: ['=']
      },
      sess : 'ewere'
    }).then((result)=>{
      if(result.status != "SUCCESS"){
        this.tableData.stocks.changeData([]);
        callback(false);
      } else{
        this.tableData.stocks.changeData(result.data);
        callback(false);
      }
    });
  }
  displayStockentry(callback = function(selectedRow){}){
    console.log(this.tableData.stocks.dblselected);
    if(this.tableData.stocks.dblselected == false) return;
    let name = this.tableData.stocks.selected[0]['productname'];
    let exp = this.tableData.stocks.selected[0]['expirydate'];
    this.menuService.jsonPost("/server/pharmacy/getlist.php",{
      act : 'select_operation',
      arg : {
        table: 'stockentry',
        col: ['product', 'stockexpiry_date'],
        val: [name, exp],
        signs: ['=']
      },
      sess : 'ewere'
    }).then((result)=>{
      if(result.status != "SUCCESS"){
        this.tableData.stockentry.changeData([]);
        callback(false);
      } else{
        this.tableData.stockentry.changeData(result.data);
        callback(false);
      }
    });
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: `./modals.component.html`
})
export class NgbdModalContent {
  public data;
  public inputs:any;
  public callback:Function;
  public output:string;
  public msg:string;
  public loading:boolean = false;
  public models:FormModels = new FormModels();
  constructor(public activeModal: NgbActiveModal, public menuService:MenuService) {

  }
  defineInput(data, callback){
    this.callback = callback;
    this.data = data;
    this.inputs = this.models[this.data.name];
    console.log((this.data.name).substring(0,6));
    if((this.data.name).substring(0,6) == 'update'){
      for(let prop in this.inputs){
        console.log(data.data[prop]);
        this.inputs[prop] = data.data[prop] || this.inputs[prop];
      }      
    }
    console.log(this.inputs);
  }
  addProduct(){
    this.loading = true;
    console.log(this.inputs);
    this.menuService.jsonPost("/server/pharmacy/getlist.php",{
      act : 'add_operation',
      arg : {
        data: this.inputs,
        classname: 'Product' 
      },
      sess : 'ewere'
    }).then((result)=>{
      console.log(result);
      this.handleResponse(result);
      this.callback();
    });
  }
  updateProduct(){
    this.loading = true; 
    let updateInputs = this.getUpdates(this.inputs); 
    updateInputs['wherecol'] = this.data.data.id; 
    console.log(this.data);
    this.menuService.jsonPost("/server/pharmacy/getlist.php",{
      act : 'update_operation',
      arg : {
        data : updateInputs,
        classname : 'Product'
      },
      sess : 'ewere'
    }).then((result)=>{
      console.log(result);
      this.handleResponse(result);
      this.callback();
    });
  }
  getUpdates(formInputs){
    let inputs = {}; 
    for(let prop in formInputs){
      if(formInputs[`new_${prop}`]){
        inputs[prop] = formInputs[`new_${prop}`];
      }
    } 
    return inputs;
  }
  handleResponse(response){
    this.output = null;
    this.msg = null;
    if(response.status == 'SUCCESS'){
      setTimeout(()=>{
        this.output = response.status;
        this.msg = response.data.msg;
        this.loading = false;
      }, 700);  
      setTimeout(()=>{
        this.activeModal.dismiss('Close click');
        this.output = null;
        this.msg = null;
      }, 3500,);
    }else{
      setTimeout(()=>{
        this.output = response.status;
        this.msg = response.data.msg;
        this.loading = false;
      }, 700); 
    }
    

  }
}
