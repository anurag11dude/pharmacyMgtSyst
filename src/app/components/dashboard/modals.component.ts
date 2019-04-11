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
export class DashboardModalContent implements OnInit {
    public data: any;
    public inputs: any;
    public callback: Function;
    public output: string;
    public msg: string;
    public selectedStock: any = {};
    public loading: boolean = false;
    public models: FormModels = new FormModels();
    constructor(public activeModal: BsModalRef, public menuService: MenuService, private _electronService: ElectronService) {

        console.log(this.data);
    }
    ngOnInit() {
        console.log(this.data);
        this.inputs = this.models[this.data.name];
        console.log((this.data.name).substring(0, 6));
    }
    print() {
        if (this.data.data.settings.A4PrinterisActive == "true") {
            let invoice = document.getElementsByClassName('Invoicediv')[0].innerHTML;
            if(this.data.data.settings.silentPrint == "false"){
                this._electronService.ipcRenderer.send('print', {inv: invoice, silentOption: this.data.data.settings.silentPrint, printer: this.data.data.A4Printer});
            }else if(this.data.data.posPrinterisActive == "true"){
                let pageNo = parseInt(this.data.data.settings.pageNo) || 0;
                for(let i = 0; i < pageNo; i++){
                    this._electronService.ipcRenderer.send('print', {inv: invoice, silentOption: this.data.data.settings.silentPrint, printer: this.data.data.A4Printer});
                }
            }else{
                alert('printing from A4 Printer and POS not activated')
            }
        }
        if (this.data.data.settings.posPrinterisActive == "true") {
            this.menuService.jsonPost({
                payload: this.data.data,
                sess: window['user']['username']
            }, '/server/printPOS.php').then((result) => {
                console.log(result);
            });
        }
        this.callback({ save: 'save', invoice: this.data.data.invoiceno });
        this.activeModal.hide();
    }
    stockselect(stk) {
        if (new Date(stk.expirydate) <= new Date(this.getdate())) return;
        this.selectedStock = stk;
    }
    exipiredProd(stk) {
        if (new Date(stk.expirydate) <= new Date(this.getdate())) return true;
        return false;
    }
    changeStock() {
        this.callback(this.selectedStock);
        this.activeModal.hide()
    }
    getdate() {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(new Date(), 'yyyy-MM-dd')
    }
}
