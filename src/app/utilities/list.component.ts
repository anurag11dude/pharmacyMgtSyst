import { Component, Input, Output,EventEmitter,OnChanges, SimpleChange} from '@angular/core';

@Component({
  selector: 'list-table',
  template: `
    <div class = "listcont mt-3 {{height}}">
    <div class = "listhd pr-3 row font-fam-Montserrat-bold">
        <div class = "{{!selectMode ? 'gone' : 'w-5 row'}} align-items-center px-0" ><input (click) = "selectAll();" class = "form-control" type="checkbox" [checked] = "select.checkAll == true"/></div>
        <div class = "{{!selectMode ? 'w-100 pl-3' : 'w-95 pl-2'}} pr-0 row" >
          <span  *ngFor = "let hd of tableData.map; first as isFirst" class="{{hd.width}} {{!isFirst ? 'text-center': null}} opac-70" >{{hd.name}}</span>
        </div>
    </div>
    <div class = "h-80 listbody ovflo-y pb-4" >
        <ul>
          <li  *ngFor = "let val of tableData.data"  class = "row w-100">
            <div class = "{{!selectMode ? 'gone' : 'w-5 row'}} px-0 align-items-center" ><input (click) = "selectSingle(val, $event)" class = "{{'check' + val.id}} form-control selcheck" type="checkbox" /></div>
            <div (click) = "selectRow(val)" class = "itemlistrow {{!selectMode ? 'pl-3 w-100' : 'w-95 pl-2'}} pr-0 row align-items-center f-13" [class.active] = "(selectedRow.id == val.id && !selectMode) || (select.list['obj' + val.id] && selectMode)" >
                <span *ngFor = "let key of tableData.map; first as isFirst" class = "{{key.width}} {{!isFirst ? 'text-center': null}}">{{val[key.body]}}</span>
            </div>
          </li>
        </ul>
    </div>
  </div>
  `
})
export class ListComponent implements OnChanges{

  @Input('height') height:String;
  @Input('changeDisplay') changeDisplay:boolean = false;
  @Input('dblclick') dblclick:boolean = false;
  @Input('name') name:String;
  @Input() public tableData = {
    data:[]
  };
  @Input() public selectMode:boolean = false;

  @Output() selected:EventEmitter<Object> = new EventEmitter<Object>();

  @Output() dblselected:EventEmitter<Object> = new EventEmitter<Object>();

  public select = {
    checkAll : false,
    list : {}
  }
  public selectedRow = {};

  constructor() {}

  ngOnChanges(Propchanges: {[propKey:string]: SimpleChange}){
    if(Propchanges.selectMode != undefined){
      this.selectedRow = {};
      this.select.checkAll = true;
      this.selectAll();
    }
  }
  handleDblClick(){
    console.log('dblclick'); 
    if(this.selectMode) return;
    this.dblselected.emit([this.name, [this.selectedRow], this.changeDisplay]);
  }
  selectRow(row){
    (this.dblclick && JSON.stringify(this.selectedRow) === JSON.stringify(row)) ? this.handleDblClick(): null;
    //console.log(row, this.selectedRow);
    this.selectedRow = row;
    if(!this.selectMode) this.selected.emit([this.name, [this.selectedRow], this.changeDisplay]);
  }

  selectAll(){
    this.select.list = {};
    this.select.checkAll = this.select.checkAll ? false : true;
    let selChk = document.getElementsByClassName('selcheck');
    for(let i = 0 ; i < selChk.length; i++){
      
      selChk[i]['checked'] = this.select.checkAll ? true : false;
    }
    if(!this.select.checkAll) {
      this.selected.emit([this.name, Object.values(this.select.list), this.changeDisplay]);
      return;
    }
    this.tableData.data.forEach(element => {
      let id = 'obj' + element.id;
      this.select.list[id] = element;
    });
    this.selected.emit([this.name, Object.values(this.select.list), this.changeDisplay]);
    console.log(this.select.list);
  }

  selectSingle(obj, evt){
    
    if(this.select.checkAll) 
    {
      this.selectAll(); 
      this.select.list = {};
      evt.target.checked = true;
    }
    if(evt.target.checked){
      console.log(evt.target.checked, this.select.checkAll);
      let id = 'obj' + obj.id;
      this.select.list[id] = obj;
    }else{
      let id = 'obj' + obj.id;
      delete this.select.list[id];
    }
    this.selected.emit([this.name, Object.values(this.select.list), this.changeDisplay]);
    console.log(this.select.list);
  }
}
