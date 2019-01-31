import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormModels } from 'src/app/utilities/model';
import { DatePipe } from '@angular/common';
import { ElectronService } from 'ngx-electron';
//import * as escpos from 'escpos';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: `./modals.component.html`
  })
  export class DashboardModalContent implements OnInit{
    public data:any;
    public inputs:any;
    public callback:Function;
    public output:string;
    public msg:string;
    public selectedStock:any= {};
    public loading:boolean = false;
    public models:FormModels = new FormModels();
    constructor(public activeModal: BsModalRef, public menuService:MenuService, private _electronService:ElectronService) {
  
      console.log(this.data);
    }
    ngOnInit(){
      console.log(this.data);
      this.inputs = this.models[this.data.name];
      console.log((this.data.name).substring(0,6));
    }
    print(){
        /* let invoice = document.getElementsByClassName('Invoicediv')[0].innerHTML;
        this._electronService.ipcRenderer.send('print', invoice); */
        //this.usbprint();
        this.callback({save: 'save', invoice: this.data.data.invoiceno});
        this.activeModal.hide();
    }
    stockselect(stk){
        this.selectedStock = stk;
    }
    changeStock(){
        this.callback(this.selectedStock);
        this.activeModal.hide()
    }
    getdate(){
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(new Date(), 'yyyy-MM-dd')
    }
    /* usbprint(){
        const device  = new escpos.USB();
        // const device  = new escpos.Network('localhost');
        // const device  = new escpos.Serial('/dev/usb/lp0');
        
        const options = { encoding: "GB18030"  }
        // encoding is optional
        
        const printer = new escpos.Printer(device, options);
        //console.log(escpos.USB.findPrinter());

        device.open(function(){
        printer
        .font('a')
        .align('ct')
        .style('bu')
        .size(1, 1)
        .text('The quick brown fox jumps over the lazy dog')
        .text('敏捷的棕色狐狸跳过懒狗')
        .barcode('1234567', 'EAN8')
        .qrimage('http://localhost:80/server/assets/logo.png', function(err){
            this.cut();
            this.close();
        }); 
        });
    } */
  }
  