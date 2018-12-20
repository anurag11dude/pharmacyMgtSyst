const Sequelize = require("sequelize");
module.exports = {
    sqlModule : Sequelize,
    mkModel : (connection, model) => {
        if(models[model] == undefined) return null;
        return connection.define(model, models[model], {timestamps:false, freezeTableName:true});
    }
}

const models = {
    products: {
        product_name: Sequelize.TEXT,
        product_description: Sequelize.TEXT,
        stock: Sequelize.INTEGER,
        product_retailprice: Sequelize.INTEGER,
        product_wholesaleprice: Sequelize.INTEGER,
        expiry_date: Sequelize.DATE
    },
    customers: {
        customer_name: Sequelize.TEXT,
        customer_email: Sequelize.TEXT,
        customer_phone: Sequelize.INTEGER,
        address: Sequelize.TEXT,
        account_created_on: Sequelize.DATE,
        last_visit: Sequelize.DATE,
        visit_count: Sequelize.INTEGER,
        outstanding_balance: Sequelize.INTEGER
    },
    customerinvoice: {
        customer: Sequelize.STRING,
        date: Sequelize.DATE,
        invno: Sequelize.STRING,
        totalamt: Sequelize.INTEGER,
        totalpaid: Sequelize.INTEGER,
        outbalance: Sequelize.INTEGER,
        category: Sequelize.STRING,
        paymeth: Sequelize.STRING,
        salesref: Sequelize.STRING
    },
    users: {
        username: Sequelize.STRING,
        category: Sequelize.STRING/* ,
        password: Sequelize.TEXT, */
    }
}