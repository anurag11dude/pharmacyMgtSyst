import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Tab } from 'src/app/utilities/menuTemplate';
import { List } from 'src/app/utilities/listTemplate';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap';
import { DashboardModalContent } from './modals.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public menuObj = new Tab().Dashboard;
  public tableData;
  public sanitization:DomSanitizer;
  public customClass: string = 'accord';
  public lastStock = {};
  public user = window['user']['username'];
  public invObj;
  public invoice;
  
  constructor(public menuService:MenuService, private modalService: BsModalService, private route:ActivatedRoute) {
    this.reset();
    this.handleRouterNavig(this.menuObj.selected);
    this.menuService.menuMsg.subscribe(
    data => {
      this.menuObj.selected = data.tab;
      if(data.nav == "Dashboard"){
        this.menuObj.selected = data.tab;
        console.log(this.menuObj.selected);
        this.handleRouterNavig(this.menuObj.selected.menuName);
      }
    })
  }
  reset(){
    this.tableData = new List();
    this.tableData.products.selected = [{id:0}];
    this.invObj = {};
    this.invoice = {
      customerInput: false,
      clearCustomerInput:()=>{
        this.invoice.customerInput = this.invoice.customerInput ? false : true;
        this.invoice.customer.id = "none";
        this.invoice.customer.name ="";
        this.invoice.customer.phone = "";
        this.invoice.customer.address ="";
        this.invoice.customer.paid =0;
        this.invoice.customer.paymeth = "Cash";
        this.invoice.customer.outbal = 0;
      },
      customer: {
        id: <string> "none",
        name: <string>"",
        phone: <string> "",
        address: <string>"",
        paymeth: <string> "Cash",
        outbal: <number> 0,
        paid: <number> 0
      },
      cart: {
        products:<Array<any>> [],
        total:<number> 0,
        number:<number> 0,
        selected:<number> null
      },
      stock: {
        list: <Array<any>> [],
        selected: <any> {},
      }
    };
    this.handleRouterNavig('Store');
  }
  handleRouterNavig(tab){
    console.log(tab);
    switch(tab){
      case "Store":
      this.initStore();
      break;
      default:
      this.initWelcome();
      break;
    }
  }

  ngOnInit() {
    switch(this.menuObj.selected.menuName){
      case "Store":
      this.initStore();
      break;
      default:
      this.initWelcome();
      break;
    }
  }
  initWelcome(){
    this.sortzeroStockProducts();
    this.sortIndebtedCustomers();
    this.displayLastSale();
  }
  initStore(){
    this.displayProduct();
    this.displayCustomer();
  }
  autoNav(_route){
    if(_route.menu != 'dashboard'){
      this.menuService.AutoNavigation(_route);
    }
    else{
      this.menuObj.selected = this.menuObj.menu.find((elem)=>{
        return elem.menuName == _route.tab;
      });
      this.handleRouterNavig(this.menuObj.selected.menuName);
    }
  }
  sortzeroStockProducts(){
    this.displayZeroStockProducts(()=>{})
  }
  sortIndebtedCustomers(){
    this.displayIndebtedCustomers(()=>{
      let indebt = this.tableData.indebtedCustomers.data;
      indebt.sort((a, b)=>{
        return b.outstanding_balance - a.outstanding_balance;
      })
      this.tableData.indebtedCustomers.data = indebt || [];
      console.log(this.tableData.indebtedCustomers.data);
    })
  }
  selectProd(prod){
    let thisComp = this;
    this.tableData.products.selected = [prod];
    
    this.displayStock(prod.product_name, function(){
      if(thisComp.tableData.stocks.data.length == 0 || prod.expiry_date == '0000-00-00'){
        thisComp.invoice.stock.selected = {expirydate: 'EXPIRED', stockremain: 'EMPTY'};
        return;
      }
      thisComp.invoice.stock.list = thisComp.tableData.stocks.data;
      thisComp.invoice.stock.selected = thisComp.invoice.stock.list.find((elem)=>{
        return elem.expirydate == prod.expiry_date;
      });
    });
  }
  getCustomerbyID(){
    console.log(this.invoice.customer['id']);
    let thisComp = this;
    let obj = this.tableData.customers.data.find((elem)=>{
      return elem.id == parseInt(thisComp.invoice.customer['id']);
    });
    console.log(obj);
    this.invoice.customer['name'] = obj.customer_name;
    this.invoice.customer['phone'] = obj.customer_phone;
    this.invoice.customer['address'] = obj.address;
    this.invoice.customer['outbal'] = obj.outstanding_balance;
  }
  pushProductToCart(){
    console.log(this.tableData.products.selected[0].id == 0);
    if(this.tableData.products.selected[0].id == 0 ) return;
    let prod = Object.assign({}, this.tableData.products.selected[0]);
    prod['quantity'] = 0; 
    prod['unitcost'] = prod.product_wholesaleprice; 
    prod['stock'] = this.invoice.stock.selected['stockremain']; 
    prod['expiry_date'] = this.invoice.stock.selected['expirydate']; 
    prod['pricetype'] = 'wholesale'; 
    prod['totalcost'] = 0; 
    console.log(prod);
    let found = this.invoice.cart.products.find((elem)=>{
      return (elem.product_name == prod.product_name && elem.expiry_date == prod.expiry_date);
    });
    console.log(found, this.invoice.stock.selected['expirydate']);
    if(found || this.invoice.stock.selected.expirydate == "EXPIRED") return;
    if(this.invoice.cart.selected != null){
      this.invoice.cart.products[this.invoice.cart.selected] = prod;
    }else{
      this.invoice.cart.products.push(prod);
    }
    this.calculateTotal();
  }
  togglePriceType($index){
    if(this.invoice.cart.products[$index].pricetype == 'wholesale'){
      this.invoice.cart.products[$index].pricetype = 'retail';
      this.invoice.cart.products[$index].unitcost = this.invoice.cart.products[$index].product_retailprice;
    }else{
      this.invoice.cart.products[$index].pricetype = 'wholesale';
      this.invoice.cart.products[$index].unitcost = this.invoice.cart.products[$index].product_wholesaleprice;
    }
    this.calculateTotal();
    console.log($index, this.invoice.cart.products[$index].unitcost, this.invoice.cart.products);
  }

  displayStock(prod, callback = function(){}){
    this.postCall({table: 'stock', col:['productname'], val:[prod], signs:['=']}, 'stocks', callback);
  }
  displayProduct(callback = function(){}){
    this.postCall({table: 'products'}, 'products', function(){
    });
  }
  displayCustomer(callback = function(){}){
    this.postCall({table: 'customers'}, 'customers', callback);
  }
  displayZeroStockProducts(callback = function(){}){
    this.postCall({table: 'products', col:['stock'], val:['0'], signs: ['=']}, 'zeroStockProducts', callback);
  }
  displayLastSale(callback = ()=>{}){
    this.postCall({table: 'customerinvoice'}, 'transactionHistory', ()=>{
      this.lastStock = this.tableData.transactionHistory.data.reduce((max,elem)=>{
      return parseInt(elem.id) > max.id && parseInt(elem.totalamt) > 0 ? elem : max;
    },{id: 0});
      console.log(this.lastStock['invno']);
      this.postCall({table: 'sales', col: ['invoiceno'], val: [this.lastStock['invno']], signs: ['=']}, 'lastSales', callback);
    });
  }
  displayIndebtedCustomers(callback = function(){}){
    this.postCall({table: 'customers', col:['outstanding_balance'], val:['0'], signs: ['>']}, 'indebtedCustomers', callback);
  }
  printPreview(){
    let printcart = {};
    this.invoice.cart.products.forEach((elem)=>{
      if(printcart[`${elem.id}${elem.pricetype}`] != undefined){
        printcart[`${elem.id}${elem.pricetype}`]['quantity'] = parseInt(printcart[`${elem.id}${elem.pricetype}`]['quantity']) + parseInt(elem.quantity);
        printcart[`${elem.id}${elem.pricetype}`]['totalcost'] = parseInt(printcart[`${elem.id}${elem.pricetype}`]['totalcost']) + parseInt(elem.totalcost);
        console.log(printcart[`${elem.id}${elem.pricetype}`]['quantity'], printcart[`${elem.id}${elem.pricetype}`]['totalcost']);
      }else{
        printcart[`${elem.id}${elem.pricetype}`] = Object.assign({}, elem);
      } 
    })
    printcart = Object.values(printcart);

    this.postCall({table: 'settings'}, 'general', ()=>{
      this.invObj = this.tableData.general.data.find((elem)=>{
        return elem.prop == 'inv'
      });
      let invoice =String(100000 + parseInt(this.invObj['value']));
      invoice = invoice.replace('1', 'PP');
      let setting = {};
      this.tableData.general.data.forEach((elem)=>{
        setting[elem.prop] = elem.value;
      })
      this.openModal({size: 'lg', name:'printPreview', data: {
        cart : printcart,
        customer : this.invoice.customer,
        sum : this.invoice.cart,
        settings : setting,
        invoiceno: invoice
      }}, 'saveSale')
    });
  }
  saveSale(data){
    if(data.save != "save") return;
    let val = [];
    let invoice = data.invoice;
    
    const datePipe = new DatePipe('en-US');
    this.invoice.cart.products.forEach((elem)=>{
      let entry = [];
      entry.push(invoice);
      entry.push(this.invoice.customer.name);
      entry.push(elem.product_name);
      entry.push(elem.quantity);
      entry.push(elem.unitcost);
      entry.push(elem.totalcost);
      entry.push(this.invoice.cart.total);
      entry.push(this.invoice.customer.paid);
      entry.push((this.invoice.cart.total - this.invoice.customer.paid));
      entry.push(elem.pricetype);
      entry.push(this.user);
      entry.push(datePipe.transform(new Date(), 'yyyy-MM-dd'));
      entry.push(this.invoice.customer.paymeth);
      entry.push(elem.expiry_date);
      val.push(entry);
    })
    console.log(val);
    let newinv = parseInt(this.invObj['value']) + 1;
    this.postCall(val, '', ()=>{
      this.postCall({value: newinv, wherecol: 'inv'}, 'general', ()=>{}, 'update_operation', 'Settings');
      this.reset();
    }, 'add_operation', 'Sell');
  }
  postCall(payload, type, callback, action = 'select_operation', classtype = ''){
    let thisComp = this;
    this.menuService.jsonPost({
      act : action,
      arg : {
        data: payload,
        classname: classtype
      },
      sess : window['user']['username']
    }).then((result)=>{
      console.log(result);
      if(result.status != "SUCCESS"){
        if(action == "select_operation") thisComp.tableData[type].data = [];
        callback();
      } else{
        if(action == "select_operation") thisComp.tableData[type].data = result.data;
        callback();
      }
    })
  }
  openModal(_data, _callback) {
    let thisComp = this;
    const initialState = {
      data : _data,
      callback : (x)=>{thisComp[_callback](x)}
    };
    const modalRef = this.modalService.show(DashboardModalContent, {initialState});
    modalRef.setClass(`modal-${_data.size} modal-dialog-centered`);
  }
  changeStock(arg){
    if(!arg) return;
    console.log(arg);
    this.invoice.stock.selected = arg;
    if(this.invoice.cart.selected != null){
      let found = this.invoice.cart.products.find((elem)=>{
        return (elem.id == this.invoice.cart.products[this.invoice.cart.selected].id && elem.expiry_date == this.invoice.stock.selected.expirydate);
      });
      if(found || this.invoice.stock.selected.productname != this.invoice.cart.products[this.invoice.cart.selected].product_name) return;
      console.log(this.invoice.cart.products[this.invoice.cart.selected], this.invoice.stock.selected.expirydate);

      this.invoice.cart.products[this.invoice.cart.selected].expiry_date = this.invoice.stock.selected.expirydate;

      this.invoice.cart.products[this.invoice.cart.selected].stock = this.invoice.stock.selected.stockremain;

      this.invoice.cart.products[this.invoice.cart.selected].quantity = 0;
      this.calculateTotal();
    }
  }
  selectCartRow(index){
    this.invoice.cart.selected = this.invoice.cart.selected == index ? null : index;
    let thisComp = this;
    let prod = this.tableData.products.data.find((elem)=>{
      return elem.id == thisComp.invoice.cart.products[index]['id'] && elem.product_name == thisComp.invoice.cart.products[index]['product_name'];
    });
    if(prod) this.selectProd(prod);
  }
  changeqty(index){
    console.log(this.invoice.cart.products);
    this.invoice.cart.products[index].quantity = this.invoice.cart.products[index].quantity > this.invoice.cart.products[index].stock ? this.invoice.cart.products[index].stock : this.invoice.cart.products[index].quantity;
    this.calculateTotal();
  }
  removeCartrow(index){
    if(this.invoice.cart.products[index]['product_name'] != null){
      for(let key in this.invoice.cart.products[index]){
        if(key != 'id') this.invoice.cart.products[index][key] = null;
      }
    }else{
      this.invoice.cart.products.splice(index, 1);
      this.invoice.cart.selected = null;
    }
    console.log(this.tableData.products.selected[0]);
    this.calculateTotal();
  }
  calculateTotal(){
    let thisComp = this;
    this.invoice.cart.total = 0;
    this.invoice.cart.number = 0;
    let arr =this.invoice.cart.products.map((elem)=>{
      if(elem.product_name != null && elem.quantity != null){
        elem.totalcost = parseInt(elem.unitcost) * parseInt(elem.quantity);
        thisComp.invoice.cart.total += parseInt(elem.totalcost);
        thisComp.invoice.cart.number += 1;
      }
      return elem;
    });
    this.invoice.cart.products = arr;
  }
}
