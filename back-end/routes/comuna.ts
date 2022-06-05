import {express, mongoose} from '../index.js';

const comunaC = express.Router();
let comunaS = require("../models/comunaS");

//crear usuario
comunaC.get("/getcomunas", (req:any,res:any)=>{
    let comunas = new Array();
    let idregion = mongoose.Types.ObjectId(req.query.idregion)
    comunaS
    .find({idregion: req.query.idregion})
    .then((data:any) => {
        for(let i in data){
            comunas.push(data[i]);
        }
        res.send(comunas);
    })
    .catch((err:any) => res.json({message:err}))
})

module.exports = comunaC;