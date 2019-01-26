import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormModels } from 'src/app/utilities/model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: `./modals.component.html`
  })
  export class ProductModalContent implements OnInit{
    public data:any;
    public inputs:any;
    public callback:Function;
    public output:string;
    public msg:string;
    public loading:boolean = false;
    public models:FormModels = new FormModels();
    constructor(public activeModal: BsModalRef, public menuService:MenuService) {
  
      console.log(this.data);
    }
    ngOnInit(){
      console.log(this.data);
      this.inputs = this.models[this.data.name];
      console.log((this.data.name).substring(0,6));
      if((this.data.name).substring(0,6) == 'update'){
        for(let prop in this.inputs){
          console.log(this.data.data[prop]);
          this.inputs[prop] = this.data.data[prop] || this.inputs[prop];
        }      
      }
      console.log(this.inputs);
    }
    addProduct(){
      this.loading = true;
      console.log(this.inputs);
      this.postCall('add_operation', this.inputs, 'Product');
    }
    addStock(){
      this.loading = true;
      this.inputs = this.formatDate(this.inputs);
      console.log(this.inputs);
      let customInput = this.inputs;
      customInput['product'] = this.data.data.product_name;
      customInput['byadmin'] = 'ewere';
      this.postCall('add_operation', customInput, 'Stock');
    }
    updateProduct(){
      this.loading = true; 
      let updateInputs = this.getUpdates(this.inputs); 
      updateInputs['wherecol'] = this.data.data.id; 
      console.log(this.data);
      this.postCall('update_operation', updateInputs, 'Product');
    }
    updateStockEntry(){
      this.loading = true; 
      this.inputs = this.formatDate(this.inputs);
      let updateInputs = this.getUpdates(this.inputs); 
      updateInputs['wherecol'] = this.data.data.id; 
      updateInputs['exp'] = this.data.data.stockexpiry_date; 
      console.log(this.data);
      this.postCall('update_operation', updateInputs, 'StockEntry');
    }
    postCall(action, payload, classtype){
      this.menuService.jsonPost({
        act : action,
        arg : {
          data: payload,
          classname: classtype 
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
  }
  