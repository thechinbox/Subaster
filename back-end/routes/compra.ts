import {express, mongoose} from '../index.js';
import { Publish } from '../Interfaces/publish.js';
import { User } from '../Interfaces/user.js';


//Modulo que permite el envio de correos a gmail
let { google } = require('googleapis')
let nodemailer = require("nodemailer");

let REFRESH_TOKEN = "1//04iaQkcJ6x-XYCgYIARAAGAQSNwF-L9IrW3cy3VXTsdwRZnfGlRoW7koN3YdWMUBezDiFah604D2UEs7EWwDz6uApwLK3NJrk2ro";
let CLIENT_ID = "90357140452-qdmaul0i29hco6122uhqs7oielejdcmm.apps.googleusercontent.com";
let CLIENT_SECRET = "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";
let userMail = "testsubaster@gmail.com";
let REDIRECT_URI ="https://developers.google.com/oauthplayground"; // NO CAMBIAR
let oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI); // NO CAMBIAR
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN }); // NO CAMBIAR


let mail={
    from: "Subaster",
    to: "testsubaster@gmail.com",
    subject: "Subaster - Recibo de Compra",
    html: ""
}

const compraC = express.Router();
let compraS = require("../models/compraS");
let stockS = require("../models/stockS")
let publicationS = require("../models/publicationS");
let ObjectID = require('mongodb').ObjectID;

compraC.post('/buy', async (req:any,res:any) => {
    let user:User = req.body.user
    let publicacion:Array<Publish> = req.body.productos
    let idinactive = req.body.inactivo
    let cantidad = req.body.cantidad
    
    await saveBuy(user.id, publicacion, cantidad, idinactive).then((data:any) =>{
        mail.html = data;
    })
    for(let p of publicacion){
        console.log("Actualizando cantidad de las publicaciones");
        await updateQuantity(p.id,(p.cantidad as number - cantidad));
    }
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

async function saveBuy(idusuario:any, publicaciones:Array<Publish>, cantidad:any, inactivo:any){
    let total = 0;
    let html ='<div style="text-align: center;">'+
                        '<h1>Subaster</h1>'+
                        '<h4 style="margin-top: 20px">¡Hola! Gracias por comprar con nosotros.</h4>'+
                        '<h5>Te adjuntamos el recibo de tu compra:</h5>'
    for(let p of publicaciones){
        html = html + '<h5>Código: ' + p.id + '</h5>'
        html = html + '<h5>Artículo: '+ p.nombre +'</h5>'
        html = html + '<h5>Valor: CLP$' + p.precio + '</h5>'
        total = total + (p.precio as number)
        await stockS.
        findOneAndUpdate({"idpublicacion": ObjectID(p.id)}, {$set: {"idestado": ObjectID(inactivo)}}, async (err:any, data:any ) =>{   
            let compra = new compraS({
                idstock: data._id ,
                idusuario:idusuario,
                idpublicacion:p.id,
                fechaventa:new Date()
            })
            await compra
            .save(async (err:any, data:any) =>{
                if(data){
                    console.log("venta fija update");
                }
                else{
                    console.log(err);   
                }
            })
        }).clone()
    }    
    html = html + '<h5>Total: CLP$' + total + '</h5>'
    html = html + '</div>'     
    return html
}

async function updateQuantity(idpublicacion:any, cantidadA:any) {
    publicationS
    .findOneAndUpdate({_id: idpublicacion}, {$set: {cantidad: cantidadA}}, (err:any, data:any) =>{
        if(err){
            console.log("Error encontrado al añadir iddireccion en publicacion");
            console.log(err);
            return JSON.stringify({status:"invalid"})
        }
       return JSON.stringify({status:"ok"})
    })
}

module.exports = compraC;