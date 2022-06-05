import {express} from '../index.js';

const unidadC = express.Router();
let unidadS = require("../models/unidadesS");

//crear usuario
unidadC.post("/upunidad", (req:any,res:any)=>{
    unidadS(req.body)
    .save().
    then((data:any)=>res.json(data))
    .catch((err:any) => res.json(err))
})

unidadC.get("/getunidades", (req:any,res:any)=>{
    let unidades = new Array();
    unidadS
    .find()
    .then((data:any) => {
        for(let i in data){
            unidades.push(data[i]);
        }
        res.send(unidades);
    })
    .catch((err:any) => res.json({message:err}))
})
module.exports = unidadC;