import * as deepEqual from "deep-equal";
export class List{
    products:ListTemplate = new ListTemplate([
        {name: "Product", body: "product_name", width:"w-25"},
        {name: "Description", body: "product_description", width:"w-25"},
        {name: "Stock", body: "stock", width:"w-10"},
        {name: "Retail", body: "product_retailprice", width:"w-10"},
        {name: "Wholesale", body: "product_wholesaleprice", width:"w-10"},
        {name: "C.ExpDate", body: "expiry_date", width:"w-20"}
    ]);
    stocks:ListTemplate = new ListTemplate([
        {name: "Expiry", body: "expirydate", width:"w-25"},
        {name: "Stk. Bgt", body: "stockbought", width:"w-25"},
        {name: "Stk. Sold", body: "stocksold", width:"w-25"},
        {name: "Stk. Left", body: "stockremain", width:"w-25"}
    ]);
    stockentry:ListTemplate = new ListTemplate([
        {name: "Entry", body: "entry_date", width:"w-35"},
        {name: "Stock", body: "stockno", width:"w-30"},
        {name: "SalesRef", body: "byadmin", width:"w-35"}
    ]);
    
    constructor(){
        
    } 
}

class ListTemplate{
    map:Array<any>;
    data?:Array<any>;
    multiSelect:boolean = false;
    change:boolean = false;
    selected:any = false;
    dblselected:any = false; 
    search:string; 
    changeData = function(newData){
        console.log(deepEqual(this.data, newData));
        if(deepEqual(this.data, newData)) return;
        this.data = newData;
        this.change = this.change == true ?  false : true;
        console.log(this.selected);
        if(this.selected == false) return;
        let row = this.data.find((obj)=>{
            return obj.id == this.selected[0].id;
        });
        console.log(row);
        if(row){ 
            this.selected = [row];
        }else{
            this.selected = false;
            this.dblselected = false;
        }
    }; 
    constructor(map){
        this.map = map;
    }
}