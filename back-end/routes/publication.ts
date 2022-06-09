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
let contentS = require("../models/contentS")
//Publicar Producto
publishC.post("/publish", (req:any,res:any)=>{
    let infopublicacion:Publish = req.body
    let direccion:Direccion = infopublicacion.direccion
    let media:Array<MediaContent> = infopublicacion.url
    console.log(media);
    
    publicationS(infopublicacion)
    .save()
    .then((data:any) => {    
        let direccionUpload = saveDirection(data._id, direccion, media, res);    
        
    })
    .catch((err:any) =>{
        res.send(JSON.stringify({status:err}))
    })
    
})
//Crear direccion asociada al producto
async function saveDirection(idpublicacion:any, direccion:Direccion, media:Array<MediaContent>, res:any){
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
            res.send(JSON.stringify(err))
            
        } 
        
        saveContent(idpublicacion,data._id,media,res)
        
    })
}

//Crear contenidos asociados al producto
async function saveContent(idpublicacion:any,iddireccion:any,urls:Array<MediaContent>, res:any) {
    for(let url of urls){
        let urlUpload = new contentS({
            idpublicacion:idpublicacion,
            url:url.url
        })
        urlUpload.save((err:any,data:any)=>{
            if(err){
                console.log(err);
                res.send(JSON.stringify(err))
            }
            console.log("Se subio: ", data);
        })
    }
    let update = updatePublication(idpublicacion, iddireccion, res) 
    return JSON.stringify(update)  
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
    let idsQuery = new Array();
    for(let id of req.query.categoria.split(",")){
        if(id != ""){
            idsQuery.push(id)
        }
    }
    console.log(idsQuery)
    publicationS
    .find({categoria: idsQuery})
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
            console.log("Error encontrado al obtener iddireccion en publicacion");
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

publishC.get("/getmedia", (req:any,res:any) =>{ 
    contentS
    .find({idpublicacion:{$gte:req.query.id}}, (err:any, data:any) =>{
        if(err){
            console.log("Error encontrado al obtener contenido de la publicacion");
            console.log(err);            
        } 
        let urls = new Array()
        for(let url of data){
            urls.push(url.url)
        }              
        res.send(urls)
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