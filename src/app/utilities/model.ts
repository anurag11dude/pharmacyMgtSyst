export class FormModels{
    public addProduct = {
        product_name : <string>  null,
        product_description : <string>  null,
        product_retailprice : <number> null,
        product_wholesaleprice : <number> null
    };
    public updateProduct = {
        product_name : <string>  null,
        product_description : <string>  null,
        product_retailprice : <number> null,
        product_wholesaleprice : <number> null,
        new_product_name : <string>  null,
        new_product_description : <string>  null,
        new_product_retailprice : <number> null,
        new_product_wholesaleprice : <number> null
    };
    
    constructor(){}
}
