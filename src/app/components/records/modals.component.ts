import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormModels } from 'src/app/utilities/model';
import { ElectronService } from 'ngx-electron';
import { List } from 'src/app/utilities/listTemplate';

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
    }
    ngOnInit(){
      console.log(this.data);
    }
    print(){
      if(this.settings.A4PrinterisActive == "true") {
        let invoice = document.getElementsByClassName('printRecord')[0].innerHTML;
        this._electronService.ipcRenderer.send('print', {inv: invoice, silentOption: this.settings.silentPrint, printer: this.settings.A4Printer});
      }else{
        alert('printing from A4 Printer is not activated')
      }
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
  