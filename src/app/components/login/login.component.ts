import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/utilities/listTemplate';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;
  public logo = '';
  public output = '';
  public auth = {
    username:<string> '',
    password:<string> '',
  };
  public tableData = new List();

  constructor(public menuService:MenuService, public router: Router) { 
    this.getLogo();
  }

  ngOnInit() {

  }

  authenticate(auth){
    console.log(auth);
    this.loading = true;
    let user;
    let time;
    this.postCall({username: auth.username, password: auth.password}, '',(data)=>{
      console.log(data);
      if(data[0] == 'error') {
        this.output = data[1];
        time = 1000;
      }else if(data[0] == 'good'){
        this.output = 'Authorization Granted';
        user = data[1];
        localStorage.setItem('user', JSON.stringify(user));
        time = 500;
      }
      this.loading = false;
      setTimeout(()=>{
        this.output = '';
        if(data[0] == 'good'){
          this.router.navigate([`pharmacy`], { queryParams: user })
        }
        
      }, time);
    },'/server/login.php');
  }
  getLogo(){
    this.postCall({table: 'settings'}, 'general', ()=>{
      let logoObj = this.tableData.general.data.find((elem)=>{
        return elem.prop == 'logo';
      });
      this.logo = logoObj.value;
    });
  }
  postCall(payload, type, callback, url = '/server/getlist.php', action = 'select_operation', classtype = ''){
    let send;
    let thisComp = this;
    if(type != ''){
      send = this.menuService.jsonPost({
        act : action,
        arg : {
          data: payload,
          classname: classtype
        },
        sess : ''
      }, url);
    }else{
      send = this.menuService.jsonPost(payload, url);
    }
    send.then((result)=>{
      console.log(result);
      if(type == '') {
        callback(result.data);
        return;
      }
      if(result.status != "SUCCESS"){
        if(action == "select_operation") thisComp.tableData[type].data = [];
        callback();
      } else{
        if(action == "select_operation") thisComp.tableData[type].data = result.data;
        callback();
      }
    })
  }

}
