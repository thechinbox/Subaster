import {express} from '../index.js';

const regionC = express.Router();
let regionS = require("../models/regionS");

//crear usuario
regionC.post("/upregion", (req:any,res:any)=>{
    regionS(req.body)
    .save().
    then((data:any)=>res.json(data))
    .catch((err:any) => res.json(err))
})

regionC.get("/getregiones", (req:any,res:any)=>{
    let regiones = new Array();
    regionS
    .find()
    .then((data:any) => {
        for(let i in data){
            regiones.push(data[i]);
        }
        res.send(regiones);
    })
    .catch((err:any) => res.json({message:err}))
})

module.exports = regionC;