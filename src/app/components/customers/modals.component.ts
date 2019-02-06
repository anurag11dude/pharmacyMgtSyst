import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormModels } from 'src/app/utilities/model';
import { DatePipe } from '@angular/common';
import { ElectronService } from 'ngx-electron';
import { List } from 'src/app/utilities/listTemplate';
@Component({
    selector: 'ngbd-modal-content',
    templateUrl: `./modals.component.html`
  })
  export class CustomerModalContent implements OnInit{
    public data:any;
    public inputs:any;
    public callback:Function;
    public output:string;
    public msg:string;
    public loading:boolean = false;
    public models:FormModels = new FormModels();
    public tableData = new List();
    public settings:any = {};
    
    constructor(public activeModal: BsModalRef, public menuService:MenuService, private _electronService:ElectronService) {
      this.displaySetting(()=>{
        let companyObj = this.tableData.general.data.find((elem)=>{
          return elem.prop == 'company';
        });
        this.tableData.general.data.forEach((elem)=>{
          this.settings[elem.prop] = elem.value;
          
        })
      });
      console.log(this.data);
    }
    ngOnInit(){
      console.log(this.data);
      this.inputs = this.models[this.data.name];
      console.log((this.data.name).substring(0,6));
      if((this.data.name).substring(0,6) == 'update'){
        for(let prop in this.inputs){
          try{
            console.log(this.data.data[prop]);
            this.inputs[prop] = this.data.data[prop] || this.inputs[prop];
          }catch(e){
            console.log(this.inputs);
          }
        }      
      }
      console.log(this.inputs);
    }
    addCustomer(){
      this.loading = true;
      console.log(this.inputs);
      this.postCall('add_operation', this.inputs, 'Customer');
    }
    updateCustomer(){
      this.loading = true; 
      let updateInputs = this.getUpdates(this.inputs); 
      updateInputs['wherecol'] = this.data.data.id; 
      console.log(this.data);
      this.postCall('update_operation', updateInputs, 'Customer');
    }
    debtPay(){
      this.loading = true;
      try{
        this.inputs['cust'] = this.data.data.customer;
      }catch(e){
        this.inputs['cust'] = this.data.selected.customer_name;
      }
      this.inputs['adminref'] = window['user']['username'];
      console.log(this.inputs);
      this.postCall('update_operation', this.inputs, 'Inventory');
    }
    addSale(){
      this.loading = true;
      console.log(this.inputs);
      this.inputs['invoiceno'] = this.data.data.invoice.invno;
      this.postCall('add_operation', this.inputs, 'Sales');
    }
    reprint(){
      if(this.settings.A4PrinterisActive == "true") {
        let invoice = document.getElementsByClassName('Invoicediv')[0].innerHTML;
        this._electronService.ipcRenderer.send('print', {inv: invoice, silentOption: this.settings.silentPrint, printer: this.settings.A4Printer});
      }
      else if(this.settings.posPrinterisActive == "true") {
        this.menuService.jsonPost({
          payload : this.data.data,
          setting : this.settings,
          sess : window['user']['username']
        },'/server/reprintPOS.php').then((result)=>{
          console.log(result);
        });
      }else{
        alert('printing from A4 Printer and POS not activated')
      }
    }
    postCall(action, payload, classtype){
      this.menuService.jsonPost({
        act : action,
        arg : {
          data: payload,
          classname: classtype 
        },
        sess : window['user']['username']
      }).then((result)=>{
        console.log(result);
        this.handleResponse(result);
        this.callback();
      });
    }
    saleSync(){
      this.data.data.products.forEach(element => {
        if(element.product_name == this.inputs.product_name){
          this.inputs.stock = element.stock;
          this.inputs.rprice = element.product_retailprice;
          this.inputs.wprice = element.product_wholesaleprice;
        }
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
      console.log(response);
      this.output = null;
      this.msg = null;
      if(response.status == 'SUCCESS'){
        setTimeout(()=>{
          this.output = response.status;
          this.msg = response.data.msg;
          this.loading = false;
        }, 700);  
        setTimeout(()=>{
          this.activeModal.hide();
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
    formatDate(input){
      const datePipe = new DatePipe('en-US');
      for(let data in input){
        if(input[data] && Object.prototype.toString.call(input[data]) === "[object Date]" && !isNaN(input[data])){
          console.log(input, input[data]);
          input[data] = datePipe.transform(input[data], 'yyyy-MM-dd');
        }
      }
      return input;
    }
    
    displaySetting(callback = ()=>{}){
      let thisComp = this;
      this.menuService.jsonPost({
        act : "select_operation",
        arg : {
          data: {table: 'settings'},
          classname: ''
        },
        sess : window['user']['username']
      }).then((result)=>{
        if(result.status != "SUCCESS"){
          thisComp.tableData['general'].changeData([]);
          callback();
        } else{
          thisComp.tableData['general'].changeData(result.data);
          callback();
        }
      })
    }
  }
  