import {express} from '../index.js';
import {mongoose} from '../index.js';

const publishC = express.Router();
let publicationS = require("../models/publicationS");
let getunidad = require("./unidades");

//crear usuario
publishC.post("/publish", (req:any,res:any)=>{
    req.body.categoria = mongoose.Types.ObjectId(req.body.categoria)
    req.body.estadoproducto = mongoose.Types.ObjectId(req.body.estadoproducto)
    req.body.unidad = mongoose.Types.ObjectId(req.body.unidad)
    req.body.tipoventa = mongoose.Types.ObjectId(req.body.tipoventa)
    publicationS(req.body)
    .save()
    .then((data:any)=>{
        data = res.json(data);
    })
    .catch((err:any) => res.json(err,'puta la wea'))
})

publishC.get("/getpublicaciones", (req:any, res:any) => {
    publicationS
    .find(req.query)
    .then((data:any) => {
        console.log(data);
    })
    .catch((err:any) => {
        console.log("Error encontrado");
        res.json(err)
    })
})


module.exports = publishC;