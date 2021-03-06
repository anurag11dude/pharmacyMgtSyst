export class FormModels{
    public addProduct = {
        product_name : <string>  null,
        product_description : <string>  null,
        shelf : <string>  null,
        product_retailprice : <number> null,
        product_wholesaleprice : <number> null
    };
    public updateProduct = {
        product_name : <string>  null,
        product_description : <string>  null,
        product_retailprice : <number> null,
        shelf : <string>  null,
        product_wholesaleprice : <number> null,
        new_product_name : <string>  null,
        new_product_description : <string>  null,
        new_shelf : <string>  null,
        new_product_retailprice : <number> null,
        new_product_wholesaleprice : <number> null
    };
    public addStock = {
        entry_date : <Date>  null,
        stockno : <number>  null,
        stockexpiry_date : <string> null,
    };
    public updateStockEntry = {
        entry_date : <string>  null,
        stockno : <string>  null,
        new_entry_date : <string>  null,
        new_stockno : <number>  null
    };
    public addCustomer = {
        customer_name : <string>  null,
        customer_phone : <number>  null,
        customer_email : <string> null,
        address : <string> null,
    };
    public updateCustomer = {
        customer_name : <string>  null,
        customer_phone : <number>  null,
        customer_email : <string> null,
        address : <string> null,
        new_customer_name : <string>  null,
        new_customer_phone : <number>  null,
        new_customer_email : <string> null,
        new_address : <string> null,
    };
    public updateDebtPay = {
        outbalance : <number>  null,
        paidamt : <number>  null,
        paymethod : <string> 'Cash'
    };
    public addSale = {
        product_name : <string> 'Select Product',
        stock : <number>  null,
        rprice : <number> null,
        wprice : <number> null,
        pricesystem : <string> 'wholesale',
        quantity : <number> null,
        paidamt : <number> null
    };
    public general = {
        company : <string> null,
        motto : <string>  null,
        bottom_msg : <string> null,
        address : <string> null,
        phone : <number> null,
        email : <string> null,
        posPrinter : <string> null,
        A4Printer : <string> null,
        posPrinterisActive : <boolean> null,
        A4PrinterisActive : <boolean> null,
        pageNo : <number> null,
        silentPrint : <boolean> null
    };
    public addUser = {
        user : <string>  null,
        username : <number>  null,
        password : <string> null,
        category : <string> '',
    };
    public updateUser = {
        user : <string>  null,
        username : <number>  null,
        currentPassword : <string> null,
        password : <string> null,
        new_currentPassword : <string> null,
        category : <string> null,
        new_user : <string>  null,
        new_username : <number>  null,
        new_password : <string> null,
        new_category : <string> '',
    };
    public addUserCategory = {
        role : <string>  null,
    };
    public updateUserCategory = {
        role : <string>  null,
        auth : <string>  null,
        new_role : <string>  null,
        new_auth : <string>  null,
    };
    public formAuth = {
        products : <boolean> false,
        customers : <boolean> false,
        records : <boolean> false,
        settings : <boolean> false,
        welcome : <boolean> false,
        store : <boolean> false,
        transactions : <boolean> false,
        sales : <boolean> false,
        stocks : <boolean> false,
        general : <boolean> false,
        users : <boolean> false,
        user_roles: <boolean> false,
        options : <boolean> false,
        add_product : <boolean> false,
        update_product : <boolean> false,
        delete_product : <boolean> false,
        add_stock : <boolean> false,
        delete_stock : <boolean> false,
        update_stockentry : <boolean> false,
        delete_stockentry : <boolean> false,
        add_customer : <boolean> false,
        update_customer : <boolean> false,
        delete_customer : <boolean> false,
        pay_debt : <boolean> false,
        delete_invoice : <boolean> false,
        add_product_to_invoice : <boolean> false,
        delete_product_from_invoice : <boolean> false,
        reprint : <boolean> false,
        add_user : <boolean> false,
        update_user : <boolean> false,
        delete_user : <boolean> false,
        add_user_role : <boolean> false,
        update_user_role : <boolean> false,
        delete_user_role : <boolean> false,
    };
    constructor(){}
}
