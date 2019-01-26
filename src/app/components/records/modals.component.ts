import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormModels } from 'src/app/utilities/model';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: `./modals.component.html`
  })
  export class RecordModalContent implements OnInit{
    public data:any;
    public inputs:any;
    public callback:Function;
    public output:string;
    public msg:string;
    public loading:boolean = false;
    public models:FormModels = new FormModels();
    constructor(public activeModal: BsModalRef, public menuService:MenuService, private _electronService:ElectronService) {
  
      console.log(this.data);
    }
    ngOnInit(){
        
    }
    print(){
        let invoice = document.getElementsByClassName('printRecord')[0].innerHTML;
        this._electronService.ipcRenderer.send('print', invoice);
    }
  }
  