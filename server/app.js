const express = require("express");
const Models = require('./models');
const Constants = require('./constants');
const Sequelize = Models.sqlModule;
console.log(Constants);
const connection = new Sequelize(Constants.db, Constants.username, Constants.password, {
    host: Constants.host,
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
app.get("/api/:table/:id", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params.id);
    let table = Models.mkModel(connection, req.params.table);
    if(!table) res.status(404).send({error : 'no such table exist', data:[]});
    

    table.sync().then(()=>{
        if(req.params.id == 'id'){
            table.findAll({
                where : req.query
            }).then(prod=>{
                result = [];
                prod.forEach((val)=>{
                    result.push(val.dataValues);
                });
                res.status(200).send(JSON.stringify({data:result}));
            })
        }else{

        }        
    })
});

app.listen("8080", ()=>{
    console.log("listening on port 8080");
})