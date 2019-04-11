
export class Tab{
    Dashboard : TabTemplate = {
        menu: [],
        selected: {menuName: '', sidebar: ''}
    };
    Products : TabTemplate = {
        menu: [],
        selected: {menuName: '', sidebar: ''}
    };
    Customers : TabTemplate = {
        menu: [],
        selected: {menuName: '', sidebar: ''}
    };
    Records : TabTemplate = {
        menu: [],
        selected: {menuName: '', sidebar: ''}
    };
    Settings : TabTemplate = {
        menu: [],
        selected: {menuName: '', sidebar: ''}
    };
    authen;
    constructor(){
        this.authen = JSON.parse(localStorage.getItem('user')).auth;
        this.createDashboardTab()
        this.createProductsTab()
        this.createCustomersTab()
        this.createRecordsTab()
        this.createSettingsTab()
    }
    createSettingsTab(){
        this.Settings.menu = [
            {menuName : 'General', sidebar: 'gone'},
            {menuName : 'Users', sidebar: 'w-30'},
            {menuName : 'User Roles', sidebar: 'w-30'},
            {menuName : 'Options', sidebar: 'gone'}
        ];
        if (this.authen['general'] !== false)
        this.Settings.selected = {menuName : 'General', sidebar: 'gone'};
        else if (this.authen['users'] !== false)
        this.Settings.selected = {menuName : 'Users', sidebar: 'w-30'};
        else if (this.authen['user_roles'] !== false)
        this.Settings.selected = {menuName : 'User Roles', sidebar: 'w-30'};
        else if (this.authen['options'] !== false)
        this.Settings.selected = {menuName : 'Options', sidebar: 'gone'};
    }
    createDashboardTab(){
        this.Dashboard.menu = [
            {menuName : 'Welcome', sidebar: 'w-30'},
            {menuName : 'Store', sidebar: 'w-30'},
        ];
        if (this.authen['welcome'] !== false)
        this.Dashboard.selected = {menuName : 'Welcome', sidebar: 'w-30'};
        else if (this.authen['store'] !== false)
        this.Dashboard.selected = {menuName : 'Store', sidebar: 'w-30'};
    }
    createRecordsTab(){
        this.Records.menu = [
            {menuName : 'Transactions', sidebar: 'gone'},
            {menuName : 'Sales', sidebar: 'gone'},
            {menuName : 'Stocks', sidebar: 'gone'}
        ];
        if (this.authen['transactions'] !== false)
        this.Records.selected ={menuName : 'Transactions', sidebar: 'gone'};
        else if (this.authen['sales'] !== false)
        this.Records.selected = {menuName : 'Sales', sidebar: 'gone'};
        else if (this.authen['stocks'] !== false)
        this.Records.selected = {menuName : 'Stocks', sidebar: 'gone'};
    }
    createCustomersTab(){
        this.Customers.menu = [
            {menuName : 'Customers', sidebar: 'w-30'}
        ];
        /* if (this.authen['transactions'] !== false) */
        this.Customers.selected = {menuName : 'Customers', sidebar: 'w-30'};
    }
    createProductsTab(){
        this.Products.menu = [
            {menuName : 'Products', sidebar: 'w-30'}
        ];
        /* if (this.authen['transactions'] !== false) */
        this.Products.selected = {menuName : 'Products', sidebar: 'w-30'};
    }
}


interface TabTemplate{
    menu:Array<any>;
    selected: {
        menuName:string,
        sidebar:string,
    };
}