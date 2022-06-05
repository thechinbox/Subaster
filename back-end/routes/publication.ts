import {express} from '../index.js';
import {mongoose} from '../index.js';
import { Direccion } from '../Interfaces/direccion.js';
import { Publish } from '../Interfaces/publish.js';

const publishC = express.Router();
let publicationS = require("../models/publicationS");
let direccionS = require("../models/direccionS")

//Publicar Producto
publishC.post("/publish", (req:any,res:any)=>{
    let infopublicacion:Publish = req.body
    let direccion:Direccion = infopublicacion.direccion
    publicationS(infopublicacion)
    .save()
    .then((data:any) => {    
        let continues = saveDirection(data._id, direccion, res);        
    })
    .catch((err:any) =>{
        res.send(JSON.stringify({status:err}))
    })
    
})
//Crear direccion asociada al producto
async function  saveDirection(idpublicacion:any, direccion:Direccion, res:any){
    let d =  new direccionS({
        idpublicacion:idpublicacion,
        region:direccion.region,
        comuna: direccion.comuna,
        direccion:direccion.direccion,
        latitud:direccion.latitud,
        longitud:direccion.longitud
    })
    d.save((err:any,data:any) =>{
        if(err){
            console.log("Error encontrado.");
            console.log(err);
        } 
        let update = updatePublication(idpublicacion, data._id, res)
        return JSON.stringify(update)
    })
}
//Añadir la direccion asociada al producto.
async function updatePublication(idpublicacion:any, iddireccion:any, res:any){;
    publicationS
    .findOneAndUpdate({_id: idpublicacion}, {$set: {iddireccion: iddireccion}}, (err:any, data:any) =>{
        if(err){
            console.log("Error encontrado al añadir iddireccion en publicacion");
            console.log(err);            
        }
        res.send(JSON.stringify(data));
    })
}

publishC.get("/getpublicaciones", (req:any, res:any) => {
    publicationS
    .find(req.query)
    .then((data:any) => {
        res.send(JSON.stringify(data));
    })
    .catch((err:any) => {
        console.log("Error encontrado");
        res.json(err)
    })
})

publishC.get("/getpublicacion", (req:any,res:any) => {
    publicationS
    .find(req.query)
    .then((data:any) =>{
        res.send(JSON.stringify(data));
    })
    .catch((err:any) => {
        res.json(err);
    })
})

module.exports = publishC;