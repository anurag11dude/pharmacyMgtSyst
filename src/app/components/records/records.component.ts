import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  menuObj = {
    menu : [{menuName : 'Overview'},{menuName : 'Sales'}],
    selected : "Overview"
  };
  public tableData:Object = {
    map:[
      {name: "Name", body: "customer", width:"w-20"},
      {name: "Inv. No", body: "invno", width:"w-10"},
      {name: "Date", body: "date", width:"w-10"},
      {name: "Cost", body: "totalamount", width:"w-10"},
      {name: "Paid", body: "totalpaid", width:"w-10"},
      {name: "OutBal", body: "outbalance", width:"w-10"},
      {name: "Category", body: "category", width:"w-10"},
      {name: "Method", body: "paymeth", width:"w-10"},
      {name: "Sales Rep", body: "salesref", width:"w-10"},
    ]
  }
  selectMode:boolean = false;
  
  constructor(public menuService:MenuService) { }

  ngOnInit() {
    this.menuService.menuMsg.subscribe(
      data => {
        if(data.nav == "Records"){
          this.menuObj.selected = data.tab;
        }
      }
    );
    this.menuService.getData("/api/customerinvoice").then((result)=>{
      console.log(result);
      this.tableData["data"] = result;
    })
  }

}
