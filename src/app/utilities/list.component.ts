import { Component, Input} from '@angular/core';


@Component({
  selector: 'list-table',
  template: `
    <div class = "listcont mt-3 h-100">
    <div class = "listhd pr-3 row font-fam-Montserrat-bold">
        <span  *ngFor = "let hd of tableData.map; first as isFirst" class="{{hd.width}} {{!isFirst ? 'text-center': null}} f-15 opac-70" >{{hd.name}}</span>
    </div>
    <div class = "h-80 listbody ovflo-y pb-4" >
        <ul>
            <li (click) = "selectRow(val)" class = "itemlistrow row align-items-center f-13" *ngFor = "let val of tableData.data">
                <span *ngFor = "let key of tableData.map; first as isFirst" class = "{{key.width}} {{!isFirst ? 'text-center': null}}">{{val[key.body]}}</span>
            </li>
        </ul>
    </div>
  </div>
  `
})
export class ListComponent{

  @Input()
  public tableData:Object = {
    data: [
      {
        check_in_date: "2018-12-09 17:02:15",
        checked_in: "YES",
        checked_out: "NO",
        contact_address: "dvc"
      }
    ], 
    map: [
      {name: "check_in_date", body: "check_in_date", width: "w-25"},
      {name: "checked_in", body: "checked_in", width: "w-25"},
      {name: "checked_out", body: "checked_out", width: "w-25"},
      {name: "contact_address", body: "contact_address", width: "w-25"},
    ]
  };

  selectedRow:Object;

  constructor() { }

  selectRow(row){
    this.selectedRow = row;
    console.log(row);
  }
}
