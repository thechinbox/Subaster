import {express} from '../index.js';

const cateogoriasC = express.Router();
let cateogoriasS = require("../models/categoriasS");

//crear usuario
cateogoriasC.post("/upcategoria", (req:any,res:any)=>{
    cateogoriasS(req.body)
    .save().
    then((data:any)=>res.json(data))
    .catch((err:any) => res.json(err,'puta la wea'))
})

cateogoriasC.get("/getcategorias", (req:any,res:any)=>{
    let cateogorias = new Array();
    cateogoriasS
    .find()
    .then((data:any) => {
        for(let i in data){
            cateogorias.push(data[i]);
        }
        return cateogorias;
    })
    .catch((err:any) => res.json({message:err}))
})

module.exports = cateogoriasC;