export class Tab{
    Dashboard : TabTemplate = {
        menu: [
            {menuName : 'Welcome', sidebar: 'w-30'},
            {menuName : 'Store', sidebar: 'w-30'},
        ],
        selected : {menuName : "Welcome", sidebar : 'w-30'}
    };
    Products : TabTemplate = {
        menu: [
            {menuName : 'Products', sidebar: 'w-30'}
        ],
        selected : {menuName : "Products", sidebar : 'w-30'}
    };
    Customers : TabTemplate = {
        menu: [
            {menuName : 'Customers', sidebar: 'w-30'}
        ],
        selected : {menuName: "Customers", sidebar: 'w-30'}
    };
    Records : TabTemplate = {
        menu: [
            {menuName : 'Transaction', sidebar: 'gone'},
            {menuName : 'Sales', sidebar: 'gone'},
            {menuName : 'Stocks', sidebar: 'gone'}
        ],
        selected : {menuName : "Transaction", sidebar: 'gone'}
    }
    Settings : TabTemplate = {
        menu: [
            {menuName : 'General', sidebar: 'gone'},
            {menuName : 'Users', sidebar: 'w-30'}
        ],
        selected : {menuName:"General", sidebar: 'gone'}
    }
    constructor(){
        
    }
}


interface TabTemplate{
    menu:Array<any>;
    selected? : {
        menuName: string,
        sidebar: string,
    };
}