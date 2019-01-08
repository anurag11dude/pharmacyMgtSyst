import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  menuObj = {
    menu : [{menuName : 'Overview'}],
    selected : "Overview"
  };
  public tableData:Object = {
    map:[
      {name: "Customer", body: "customer_name", width:"w-20"},
      {name: "Phone", body: "customer_phone", width:"w-15"},
      {name: "Address", body: "address", width:"w-30"},
      {name: "last visit", body: "last_vist", width:"w-15"},
      {name: "visit count", body: "visit_count", width:"w-10"},
      {name: "out.bal", body: "outstanding_balance", width:"w-10"}
    ]
  }
  selectMode:boolean = false;
  
  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Customers"){
          this.menuObj.selected = data.tab;
        }
      }
    );
    this.menuService.getData("/api/customers").then((result)=>{
      console.log(result);
      this.tableData["data"] = result;
    })
  }

  listSelected(params){
    console.log(params);
  }
}
