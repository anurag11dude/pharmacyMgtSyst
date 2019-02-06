import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Http, RequestOptions } from '@angular/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

const SERVER = "http://localhost:80";
@Injectable({
  providedIn: 'root'
})

export class MenuService {

public menuMsg = new Subject<any>();
public AutoNavig = new Subject<any>();
public settingChange = new Subject<any>();

  constructor(private http:Http) { }

  sendMenu(menu){
     this.menuMsg.next(menu);
  }
  jsonPost(data = {}, path = `/server/getlist.php`):Promise<any>{
    /* let header:any = this.setHeader();
    let options = new RequestOptions({ headers: header });
    console.log(data); */
    path = SERVER + path;
    return this.http.post(path, data).toPromise().then(response => {
      console.log(response);
      let result; 
      try{
        let resp = response.json().data as Object;
        let message;
        if(resp['msg'] == undefined){
          message = resp;
          result = {
            status : "SUCCESS",
            data : message
          }
        }else{
          message = {msg : resp['msg']['resp']};
          
          if(resp['msg']['output'] == 'success'){
            result =  {status : "SUCCESS",data : message};
          }else{
            result =  {status : "ERROR",data : message};
          }        
        }
      }catch (e){
        console.log(e);
        result = {
          status : "ERROR",
          data : {msg: 'something went wrong'}
        }
      }
      return result;
    });
  }

  setHeader(){
    let header = new Headers({ 'Content-Type': 'application/json' });
    header.append('Accept', 'application/json');
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    console.log("headers1: value" + JSON.stringify(header));

    return header;
  }

  AutoNavigation(action){
    this.AutoNavig.next(action);
  }

  settingChanged(action){
    this.settingChange.next(action);
  }

}
