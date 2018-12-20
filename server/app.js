const express = require("express");
const Models = require('./models');
const Sequelize = Models.sqlModule;

const connection = new Sequelize('pricepoint', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false
});
const app = express();

app.get("/api/", (req, res) => {
    res.send('hello world');
});

app.get("/api/:table", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params.table);
    let table = Models.mkModel(connection, req.params.table);
    if(!table) res.status(404).send({error : 'no such table exist', data:[]});
    
    table.sync().then(()=>{
        table.findAll().then(prod=>{
            result = [];
            prod.forEach((val)=>{
                result.push(val.dataValues);
            });
            res.status(200).send(JSON.stringify({data:result}));
        })
    })
});

app.listen("8080", ()=>{
    console.log("listening on port 8080");
})