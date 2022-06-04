import {express} from '../index.js';

const estadopC = express.Router();
let estadopS = require("../models/estadosproductosS");

//crear usuario
estadopC.post("/upestadoproducto", (req:any,res:any)=>{
    estadopS(req.body)
    .save().
    then((data:any)=>res.json(data))
    .catch((err:any) => res.json(err,'puta la wea'))
})

estadopC.get("/getestadosp", (req:any,res:any)=>{
    estadopS
    .find()
    .then((data:any) => res.json(data))
    .catch((err:any) => res.json({message:err}))
})

module.exports = estadopC;