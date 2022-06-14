import {express, mongoose} from '../index.js';
import { Publish } from '../Interfaces/publish.js';
import { User } from '../Interfaces/user.js';

let emailerC = express.Router();

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


compraC.post('/buy', async (req:any,res:any) => {
    let status = new Array()
    let user:User = req.body.user
    let publicacion:Array<Publish> = req.body.productos
    await saveBuy(user.id, publicacion).then((data:any) =>{
        mail.html = data;
    })
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

async function saveBuy(idusuario:any, publicaciones:Array<Publish>){
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
        let compra = new compraS({
            idusuario:idusuario,
            idpublicacion:p.id,
            fechaventa:new Date()
        })
        compra
        .save(async (data:any, err:any) =>{
            if(data){
                console.log(data);
            }
            else{
                console.log(err);
                
            }
        })
    }    
    html = html + '<h5>Total: CLP$' + total + '</h5>'
    html = html + '</div>' 
    console.log(html);
    
    return html
}

module.exports = compraC;