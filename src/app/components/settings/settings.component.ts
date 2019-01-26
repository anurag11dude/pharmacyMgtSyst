import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Tab } from 'src/app/utilities/menuTemplate';
import { List } from 'src/app/utilities/listTemplate';
import { transition, animate, state, trigger, style } from '@angular/animations';
import { BsModalService } from 'ngx-bootstrap';
import { FormModels } from 'src/app/utilities/model';
import { UserModalContent } from './modals.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity:0, display: 'none'})),
      transition('void => *', animate("300ms 300ms")),
      transition('* => void', animate("100ms")),
    ])
  ]
})
export class SettingsComponent implements OnInit {

  public loaderUrl:string = "http://localhost:80/server/assets/loader.gif";

  
  menuObj = new Tab().Settings;
  public tableData = new List();
  public loading = new FormModels().general;
  public inputs = new FormModels().general;

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
      this.handleAction(this.route.snapshot.queryParams.action);
    }
    this.menuService.menuMsg.subscribe(
      data => {
        console.log(data);
        if(data.nav == "Settings"){
          this.menuObj.selected = data.tab;
          console.log(this.menuObj.selected);
          this.handleRouterNavig(this.menuObj.selected.menuName);
        }
      }
    );
  }

  handleAction(action){
    switch(action){
      case 'addUser':
      this.openModal({size: 'md', name:'addUser', data: this.tableData.users.selected[0]});
      break;
    }
   }
  handleRouterNavig(tab){
    console.log(tab);
    switch(tab){
      case 'General':
        this.displaySetting();
      break;
      case 'Users':
        this.displayUser();
      break;
      default:
      this.displaySetting();
      break;
    }
  }
  ngOnInit() {
    /* this.menuService.menuMsg.subscribe(
      data => {
        console.log(data);
        if(data.nav == "Settings"){
          this.menuObj.selected = data.tab;
          console.log(this.menuObj.selected);
          switch(this.menuObj.selected.menuName){
            case 'General':
              this.displaySetting();
            break;
            case 'Users':
              this.displayUser();
            break;
            default:
            this.displaySetting();
            break;
          }
        }
      }
    ); */
  }
  activateSelectMode(list){
    let selmode = this.tableData[list].multiSelect;
    this.tableData.falsify(['users'], 'multiSelect');
    selmode ? this.tableData.falsify([list], 'multiSelect') : 
    this.tableData.truthify([list], 'multiSelect');
    this.tableData.falsify([list], 'selected');
  }
  settingUpdate(setting){
    this.loading[setting] = "yes";
    let thisComp = this;
    this.postCall({
      value : thisComp.inputs[setting],
      wherecol : setting
    }, 'general', ()=>{
      thisComp.loading[setting] = 'no';
      if(setting == 'company')thisComp.menuService.settingChanged({company: thisComp.inputs['company']});
    }, 'update_operation', 'Settings')
    console.log({
      value : thisComp.inputs[setting],
      wherecol : setting
    });
  }
  displaySetting(callback = ()=>{}){
    let thisComp = this;
    this.postCall({table: 'settings'}, 'general', function(){
      thisComp.tableData.general.data.forEach((elem)=>{
        thisComp.inputs[elem.prop] = elem.value;
      });
      console.log(thisComp.inputs);
    });
  }
  displayUser(callback = function(){}){
    this.postCall({table: 'users'}, 'users', callback);
  }
  deleteRows(selectedRow, classtype){
    if(!confirm("Are you sure you want to delete the selection")) return;
    this.postCall(selectedRow, '', function(){}, 'delete_operation', classtype);
  }
  usersListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'users')) {
      this.tableData.falsify(['users'], 'selected'); return;
    }
    this.tableData.falsify(['sessions'], 'selected');
    this.displaySession();
  }
  displaySession(callback = ()=>{}){
    if(!this.tableData.users.selected) return;
    let id = this.tableData.users.selected[0]['username'];
    this.postCall({table: 'users_session', col: ['username'], val: [id], signs: ['=']}, 'sessions', callback);
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
    const modalRef = this.modalService.show(UserModalContent, {initialState});
    modalRef.setClass(`modal-${_data.size} modal-dialog-centered`);
    
  }
  resetTableSelections(thisComp){
    thisComp.displayUser(thisComp.displaySession());
  }
  postCall(payload, type, callback, action = 'select_operation', classtype = ''){
    let thisComp = this;
    this.menuService.jsonPost({
      act : action,
      arg : {
        data: payload,
        classname: classtype
      },
      sess : 'ewere'
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
