import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

public menuMsg = new Subject<any>();

  constructor() { }

  sendMenu(menu){
     this.menuMsg.next(menu);
  }
}
