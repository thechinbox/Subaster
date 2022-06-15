import {express, mongoose} from '../index.js';

const estadospublicacionC = express.Router();
let estadospublicacionS = require("../models/estadospublicacionS");

//crear usuario
estadospublicacionC.get("/getestadospublicacion", (req:any,res:any)=>{
    let estados = new Array();
    estadospublicacionS
    .find()
    .then((data:any) => {
        for(let i in data){
            estados.push(data[i]);
        }
        res.send(estados);
    })
    .catch((err:any) => res.json({message:err}))
})

module.exports = estadospublicacionC;