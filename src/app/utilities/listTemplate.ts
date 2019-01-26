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
    zeroStockProducts:ListTemplate = new ListTemplate([
        {name: "Product", body: "product_name", width:"w-40"},
        {name: "Retail", body: "product_retailprice", width:"w-30"},
        {name: "Wholesale", body: "product_wholesaleprice", width:"w-30"}
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
    customers:ListTemplate = new ListTemplate([
        {name: "Customer", body: "customer_name", width:"w-15"},
        {name: "Phone", body: "customer_phone", width:"w-15"},
        {name: "Address", body: "address", width:"w-25"},
        {name: "Email", body: "customer_email", width:"w-15"},
        {name: "last visit", body: "last_vist", width:"w-10"},
        {name: "visit count", body: "visit_count", width:"w-10"},
        {name: "out.bal", body: "outstanding_balance", width:"w-10"}
    ]);
    indebtedCustomers:ListTemplate = new ListTemplate([
        {name: "Customer", body: "customer_name", width:"w-50"},
        {name: "Phone", body: "customer_phone", width:"w-25"},
        {name: "out.bal", body: "outstanding_balance", width:"w-25"}
    ]);
    invoices:ListTemplate = new ListTemplate([
        {name: "Date", body: "date", width:"w-20"},
        {name: "Inv No", body: "invno", width:"w-20"},
        {name: "Total", body: "totalamt", width:"w-20"},
        {name: "Paid", body: "totalpaid", width:"w-20"},
        {name: "out.bal", body: "outbalance", width:"w-20"}
    ]);
    sales:ListTemplate = new ListTemplate([
        {name: "Product", body: "product", width:"w-30"},
        {name: "Qty", body: "quantity", width:"w-20"},
        {name: "Amt", body: "totalprice", width:"w-20"},
        {name: "Type", body: "pricetype", width:"w-30"}
    ]);
    lastSales:ListTemplate = new ListTemplate([
        {name: "Product", body: "product", width:"w-50"},
        {name: "Qty", body: "quantity", width:"w-25"},
        {name: "Amt", body: "totalprice", width:"w-25"}
    ]);
    transactionHistory:ListTemplate = new ListTemplate([
        {name: "Name", body: "customer", width:"w-20"},
        {name: "Inv. No", body: "invno", width:"w-10"},
        {name: "Date", body: "date", width:"w-10"},
        {name: "Cost", body: "totalamt", width:"w-10"},
        {name: "Paid", body: "totalpaid", width:"w-10"},
        {name: "OutBal", body: "outbalance", width:"w-10"},
        {name: "Category", body: "category", width:"w-10"},
        {name: "Method", body: "paymeth", width:"w-10"},
        {name: "Sales Rep", body: "salesref", width:"w-10"}
    ]);
    saleHistory:ListTemplate = new ListTemplate([
        {name: "Product", body: "product", width:"w-15"},
        {name: "Inv.no", body: "invoiceno", width:"w-10"},
        {name: "Customer", body: "customer_name", width:"w-15"},
        {name: "Quantity", body: "quantity", width:"w-10"},
        {name: "UnitPrice", body: "unitprice", width:"w-10"},
        {name: "TotalPrice", body: "totalprice", width:"w-10"},
        {name: "SalesDate", body: "salesdate", width:"w-10"},
        {name: "SalesRep", body: "saleref", width:"w-10"},
        {name: "PayMethod", body: "paymethod", width:"w-10"}
    ]);
    stockHistory:ListTemplate = new ListTemplate([
        {name: "Product", body: "product", width:"w-20"},
        {name: "Stock Expiry Date", body: "stockexpiry_date", width:"w-30"},
        {name: "Quantity", body: "stockno", width:"w-20"},
        {name: "Entry Date", body: "entry_date", width:"w-20"},
        {name: "Admin", body: "byadmin", width:"w-10"},
    ]);
    general:ListTemplate = new ListTemplate([
        {name: "Company Name", body: "company", width:"w-30"},
        {name: "Motto", body: "motto", width:"w-30"},
        {name: "Bottom Message", body: "bottom_msg", width:"w-40"},
        {name: "Address", body: "address", width:"w-30"},
        {name: "Phone Number", body: "phone", width:"w-30"},
        {name: "Email", body: "email", width:"w-30"},
        {name: "Account", body: "account", width:"w-30"},
        {name: "Branch", body: "branch", width:"w-30"}
    ]);
    users:ListTemplate = new ListTemplate([
        {name: "User", body: "user", width:"w-30"},
        {name: "Username", body: "username", width:"w-40"},
        {name: "Category", body: "category", width:"w-30"}
    ]);
    sessions:ListTemplate = new ListTemplate([
        {name: "Log On", body: "log_on", width:"w-50"},
        {name: "Log Off", body: "log_off", width:"w-50"}
    ]);
    quickAccess:ListTemplate = new ListTemplate([
        {name: "Add Product", route: {tab:'Products', menu : 'products', action: 'addProduct'}, img: "http://localhost:80/server/assets/adddrug1.png", width:"w-25", imgHeight: "120px", imgWidth: "120px"},
        {name: "Add Customer", route: {tab:'Customers', menu : 'customers', action: 'addCustomer'}, img: "http://localhost:80/server/assets/addcust.png", width:"w-25", imgHeight: "120px", imgWidth: "120px"},
        {name: "Add User", route: {tab:'Users', menu : 'settings', action: 'addUser'}, img: "http://localhost:80/server/assets/adduser.png", width:"w-25", imgHeight: "120px", imgWidth: "120px"},
        {name: "Add Stock", route: {tab:'Products', menu : 'products', action: 'addStock'}, img: "http://localhost:80/server/assets/adddrugstock.png", width:"w-25", imgHeight: "120px", imgWidth: "120px"},
        {name: "Pay Debt", route: {tab:'Customers', menu : 'customers', action: 'payDebt'}, img: "http://localhost:80/server/assets/paydebt.png", width:"w-25", imgHeight: "120px", imgWidth: "120px"},
        {name: "Store", route: {tab:'Store', menu : 'dashboard', action: 'store'}, img: "http://localhost:80/server/assets/store.png", width:"w-25", imgHeight: "120px", imgWidth: "120px"}
    ]);
    
    constructor(){
        
    }
    falsify(type:Array<string>, prop:string){
        Object.values(type).forEach((elem)=>{
            this[elem][prop] = false;
            if(prop == 'selected')this[elem]['dblselected'] = false;
        }, this)
    } 
    truthify(type:Array<string>, prop:string){
        Object.values(type).forEach((elem)=>{
            this[elem][prop] = true;
            if(prop == 'selected') this[elem][prop] = {};
            if(prop == 'dblselected' && this[elem]['selected'] != false)this[elem]['dblselected'] = true;
        }, this)
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
    changeData = function(newData, override = false){
        console.log(deepEqual(this.data, newData));
        if(deepEqual(this.data, newData) && !override) return;
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
    truthify(prop){
        if(this[prop] != "dblselected") {this[prop] = true; return;}
        this[prop] = this.selected ? true : false;
    }
    constructor(map){
        this.map = map;
    }
}