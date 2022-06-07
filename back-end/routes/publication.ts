import {express} from '../index.js';
import {mongoose} from '../index.js';
import { Direccion } from '../Interfaces/direccion.js';
import { Publish } from '../Interfaces/publish.js';
import { Comuna } from '../Interfaces/comuna.js';
import { Region } from '../Interfaces/region.js';
import { MediaContent } from '../Interfaces/media-content.js';

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
    let publicaciones = new Array()
    publicationS
    .find(req.query)
    .then((data:any) => {
        for(let publicacion of data){
            let p = {
                id: publicacion._id,
                nombre:publicacion.nombre,
                descripcion:publicacion.descripcion,
                categoria:publicacion.categoria,
                unidad:publicacion.unidad,
                estadopublicacion:publicacion.estadopublicacion,
                estadoproducto:publicacion.estadoproducto,
                fechapublicacion:publicacion.fechapublicacion,
                precio:publicacion.precio,
                cantidad:publicacion.cantidad,
                direccion:{
                    id:publicacion.iddireccion,
                    region:" ",
                    comuna:" ",
                    direccionS:" ",
                    latitud:0,
                    longitud:0
                },
                url:new Array()
            }
            publicaciones.push(p)
        }
        console.log(publicaciones);
        res.send(JSON.stringify(publicaciones));
    })
    .catch((err:any) => {
        console.log("Error encontrado");
        res.json(err)
    })
})

publishC.get("/getdireccion", (req:any,res:any) =>{        
    direccionS
    .findOne({_id:{$gte:req.query.id}}, (err:any, data:any) =>{
        if(err){
            console.log("Error encontrado al añadir iddireccion en publicacion");
            console.log(err);            
        }
        let direccion:Direccion = {
            id:data._id,
            region:data.region,
            comuna:data.comuna,
            direccion:data.direccion,
            latitud:data.latitud,
            longitud:data.longitud
        }        
        console.log(direccion);
        
        res.send(direccion)
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