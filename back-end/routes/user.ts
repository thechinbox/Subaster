import {express} from '../index.js';

const usuariosC = express.Router();
let userS = require("../models/userS");

//crear usuario
usuariosC.post("/signup", (req:any,res:any)=>{
    userS(req.body)
    .save()
    .then((data:any)=>{
        res.json(data)
    })
    .catch((err:any) => res.json(err,'puta la wea'))
})

module.exports = usuariosC;