const Models = require('./models');
const Sequelize = Models.sqlModule;

const connection = new Sequelize('pricepoint', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false
});
const table = Models.mkModel(connection,"products");

table.sync().then(()=>{
    table.findAll().then(prod=>{
        prod.forEach((val)=>{
            console.log(val.dataValues);
        })
        
    })
})