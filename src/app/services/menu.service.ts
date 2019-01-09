import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Http } from '@angular/http';

const SERVER = "http://localhost:80";
@Injectable({
  providedIn: 'root'
})

export class MenuService {

public menuMsg = new Subject<any>();

  constructor(private http:Http) { }

  sendMenu(menu){
     this.menuMsg.next(menu);
  }
  getData(path):Promise<any>{
    path = SERVER + path;
    return this.http.get(path).toPromise().then(response => response.json().data as Object);
    /* 
    options = new RequestOptions({
      
    })
    path = SERVER + path;
    return this.http.post(path,
      {
        params: data
      },{
        headers: new HttpHeaders
      }).toPromise().then(response => {
        response.json().data as Object;
        console.log(response);
      });
    */
  }
}
