import {express} from '../index.js';
import {mongoose} from '../index.js';
import { Direccion } from '../Interfaces/direccion.js';
import { Publish } from '../Interfaces/publish.js';
import { Comuna } from '../Interfaces/comuna.js';
import { Region } from '../Interfaces/region.js';
import { MediaContent } from '../Interfaces/media-content.js';
import { Subasta } from '../Interfaces/subasta.js';

const auctionC = express.Router();
let auctionS = require("../models/auctionS")
let direccionS = require("../models/direccionS")
let contentS = require("../models/contentS")
let estadoS = require("../models/estadospublicacionS")
let pujaS = require("../models/pujaS")

//Modulo que permite el envio de correos a gmail
let { google } = require('googleapis')
let nodemailer = require("nodemailer");

let REFRESH_TOKEN = "1//04OY1_12rLq02CgYIARAAGAQSNwF-L9IrfTgit-rx0rwo_FINCuFE3CYr_t-0okHvq_0sZWHjdqycRx7WSFLWcz193MHLuqSpzFU";
let CLIENT_ID = "90357140452-qdmaul0i29hco6122uhqs7oielejdcmm.apps.googleusercontent.com";
let CLIENT_SECRET = "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";
let userMail = "testsubaster@gmail.com";
let REDIRECT_URI ="https://developers.google.com/oauthplayground"; // NO CAMBIAR
let oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI); // NO CAMBIAR
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN }); // NO CAMBIAR

auctionC.post("/auction", (req:any,res:any)=>{
    let infopublicacion:Subasta = req.body
    let direccion:Direccion = infopublicacion.direccion
    let media:Array<MediaContent> = infopublicacion.url
    auctionS(infopublicacion)
    .save()
    .then((data:any) => {
        let direccionUpload = saveDirectionA(data._id, direccion, media, res);

    })
    .catch((err:any) =>{
        res.send(JSON.stringify({status:err}))
    })

})
//Crear direccion asociada a la subasta
async function saveDirectionA(id:any, direccion:Direccion, media:Array<MediaContent>, res:any){
    let d =  new direccionS({
        idpublicacion:id,
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

        saveContentA(id,data._id,media,res)

    })
}
//Crear contenidos asociados a la subasta
async function saveContentA(idpublicacion:any,iddireccion:any,urls:Array<MediaContent>, res:any) {
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
        })
    }
    let update = updatePublicationA(idpublicacion, iddireccion, res)
    return JSON.stringify(update)
}

//Añadir la direccion asociada al producto.
async function updatePublicationA(idpublicacion:any, iddireccion:any, res:any){;
    auctionS
    .findOneAndUpdate({_id: idpublicacion}, {$set: {iddireccion: iddireccion}}, (err:any, data:any) =>{
        if(err){
            console.log("Error encontrado al añadir iddireccion en publicacion");
            console.log(err);
            
        }
        res.send(JSON.stringify(data));
    })
}

auctionC.get("/getsubastas", (req:any, res:any) => {
    estadoS
    .findOne({estadopublicacion:"activa"})
    .then((data:any) => {
        let publicaciones = new Array()
        auctionS
        .find({estadopublicacion:data._id})
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
                    fechafinalizacion:publicacion.fechafinalizacion,
                    precioinicial:publicacion.precioinicial,
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
    .catch((err:any) => res.json({message:err}))
    
})

auctionC.get("/getauctionsid", (req:any, res:any) => {
    estadoS
    .findOne({estadopublicacion:"activa"})
    .then((data:any) => {
        let publicaciones = new Array()
        let idsQuery = new Array();
        for(let id of req.query.categoria.split(",")){
            if(id != ""){
                idsQuery.push(id)
            }
        }
        auctionS
        .find({categoria: idsQuery, estadopublicacion:data._id})
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
                    fechafinalizacion:publicacion.fechafinalizacion,
                    precioinicial:publicacion.precioinicial,
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
    .catch((err:any) => res.json({message:err}))
    
})

auctionC.get("/getsubasta", (req:any,res:any) => {
    console.log(req.query.cantidad);
    auctionS
    .findById(req.query.id)
    .then((publicacion:any) =>{
        let p = {
            id: publicacion._id,
            nombre:publicacion.nombre,
            descripcion:publicacion.descripcion,
            categoria:publicacion.categoria,
            unidad:publicacion.unidad,
            estadopublicacion:publicacion.estadopublicacion,
            estadoproducto:publicacion.estadoproducto,
            fechapublicacion:publicacion.fechapublicacion,
            fechafinalizacion:publicacion.fechafinalizacion,
            precioinicial:publicacion.precioinicial,
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
        res.send(JSON.stringify(p));
    })
    .catch((err:any) => {
        res.json(err);
    })
})
auctionC.get("/getpujas", (req:any,res:any) => {
    pujaS
    .find({idpublicacion: req.query.id})
    .then((pujas:any) =>{
        res.send(JSON.stringify(pujas));
    })
    .catch((err:any) => {
        res.json(err);
    })
})
auctionC.get("/getmaxpuja", (req:any,res:any) => {
    pujaS
    .findOne({idpublicacion: req.query.id}).sort("-valorpuja")
    .then((puja:any) =>{
        if(puja == null){
            res.send(JSON.stringify(puja))
        }else{
            res.send(JSON.stringify(puja.valorpuja));
        }
    })
    .catch((err:any) => {
        res.json(err);
    })
})
auctionC.post("/uppuja", (req:any,res:any) => {
    let body = req.body.puja;
    let subasta = req.body.subasta
    let puja = new pujaS({
        idpublicacion:body.idpublicacion,
        idusuario:body.idusuario,
        valorpuja:body.valorpuja,
        fechapuja:body.fechapuja
    })
    pujaS(puja)
    .save()
    .then(async (data:any) =>{
        let mail={
            from: "Subaster",
            to: req.body.user.correo,
            subject: "Subaster - Recibo de Puja",
            html:'<div style="text-align: center;">'+
                        '<h1>Subaster</h1>'+
                        '<h4 style="margin-top: 20px">¡Hola! Te dejamos los datos de la puja que haz realizado:.</h4>'+
                        '<h5>Producto: '+ subasta.nombre +'</h5>'+
                        '<h5>Codigo de Puja: '+ data._id +'</h5>'+
                        '<h5>Valor de Puja: '+ data.valorpuja +'</h5>'+
                        '<h5>Fecha de Puja: '+ data.fechapuja +'</h5></div>'}
        try {
            let accessToken = await oAuth2Client.getAccessToken();
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type:"OAuth2",
                    user: userMail,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            });
            await transporter.sendMail(mail);
            console.log("Email enviado correctamente a : " + userMail);
            res.send(JSON.stringify({status:"ok"}));
        } catch (err){
            console.log(err);
            res.status(200).send("enviado");
        }
    })
    .catch((err:any) => {
        res.json(err);
    })
})
module.exports = auctionC;