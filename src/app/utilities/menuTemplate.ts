export class Tab{
    Products : TabTemplate = {
        menu: [
            {menuName : 'Products'},
            {menuName : 'Sales'}
        ],
        selected : "Products"
    }
    constructor(){
        
    }
}


interface TabTemplate{
    menu:Array<any>;
    selected?:String;
}