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

  public menuObj = new Tab().Settings;
  public tableData = new List();
  public saveAuth = false;
  public authen = window['user']['auth'];
  public authJson = this.tableData.authJson.map;
  public formAuth = new FormModels().formAuth;
  public loading = new FormModels().general;
  public inputs = new FormModels().general;

  constructor(public menuService:MenuService, private modalService: BsModalService, private route:ActivatedRoute) { 
    let tab = this.route.snapshot.queryParams.tab;
    
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
    console.log(tab, this.authen);
    console.log(tab);
    switch(tab){
      case 'General':
        this.displaySetting();
      break;
      case 'Users':
        this.displayUserCategory();
        this.displayUser();
      break;
      case 'User Roles':
        this.displayUserCategory();
      break;
      case 'Options':
        this.displaySetting();
      break;
      default:
       this.displaySetting();
      break;
    }
  }
  ngOnInit() {
    
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
    let valu = this.inputs[setting] == true || this.inputs[setting] == false ? (this.inputs[setting]).toString() : this.inputs[setting];
    this.postCall({
      value : valu,
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
        elem.value = elem.value == "true" ? true : elem.value;
        elem.value = elem.value == "false" ? false : elem.value;
        thisComp.inputs[elem.prop] = elem.value;
      });
      console.log(thisComp.inputs);
    });
  }
  displayUser(callback = function(){}){
    this.postCall({table: 'users'}, 'users', callback);
  }
  displayUserCategory(callback = function(){}){
    this.postCall({table: 'user_category'}, 'userCategory', () => {
      console.log(this.tableData.userCategory);
      callback();
    });
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
  userCategoryListSelected(selectedTable){
    if(!this.selectAnyRow(selectedTable, 'userCategory')) {
      this.tableData.falsify(['userCategory'], 'selected'); return;
    }
    const authStr = this.tableData.userCategory.selected[0].auth;
    try {
      const authStrJson = JSON.parse(authStr);
      Object.keys(authStrJson).forEach(key => {
        this.formAuth[key] = authStrJson[key] ? key : false;
        /*console.log(document.querySelector(`.${key}`)); ['checked'] = authStrJson[key]; */
      });
    }catch (e) {
      this.formAuth = new FormModels().formAuth;
    }
    
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
    thisComp.displayUserCategory();
  }
  saveUserCategoryAuth(){
    console.log(this.formAuth);
    this.saveAuth = true;
    const updateAuth = {
      auth: JSON.stringify(this.formAuth),
      wherecol: this.tableData.userCategory.selected[0].id,
    }
    console.log(updateAuth, this.tableData.userCategory.selected);
    this.postCall(updateAuth, 'userCategory', () => {
      this.saveAuth = false;
    },'update_operation', 'UserCategory');
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
      if(action == 'delete_operation' || (classtype == 'UserCategory' && action == 'update_operation')){
        thisComp.resetTableSelections(this);
        callback();
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
