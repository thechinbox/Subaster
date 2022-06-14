"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
let emailerC = index_js_1.express.Router();
//Modulo que permite el envio de correos a gmail
let { google } = require('googleapis');
let nodemailer = require("nodemailer");
let REFRESH_TOKEN = "1//04iaQkcJ6x-XYCgYIARAAGAQSNwF-L9IrW3cy3VXTsdwRZnfGlRoW7koN3YdWMUBezDiFah604D2UEs7EWwDz6uApwLK3NJrk2ro";
let CLIENT_ID = "90357140452-qdmaul0i29hco6122uhqs7oielejdcmm.apps.googleusercontent.com";
let CLIENT_SECRET = "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";
let userMail = "testsubaster@gmail.com";
let REDIRECT_URI = "https://developers.google.com/oauthplayground"; // NO CAMBIAR
let oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI); // NO CAMBIAR
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN }); // NO CAMBIAR
let mail = {
    from: "Subaster",
    to: "testsubaster@gmail.com",
    subject: "Subaster - Recibo de Compra",
    html: ""
};
const compraC = index_js_1.express.Router();
let compraS = require("../models/compraS");
compraC.post('/buy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let status = new Array();
    let user = req.body.user;
    let publicacion = req.body.productos;
    yield saveBuy(user.id, publicacion).then((data) => {
        mail.html = data;
    });
    try {
        let accessToken = yield oAuth2Client.getAccessToken();
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: userMail,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        yield transporter.sendMail(mail);
        console.log("Email enviado correctamente a : " + userMail);
        res.send(JSON.stringify({ status: "ok" }));
    }
    catch (err) {
        console.log(err);
        res.status(200).send("enviado");
    }
}));
function saveBuy(idusuario, publicaciones) {
    return __awaiter(this, void 0, void 0, function* () {
        let total = 0;
        let html = '<div style="text-align: center;">' +
            '<h1>Subaster</h1>' +
            '<h4 style="margin-top: 20px">¡Hola! Gracias por comprar con nosotros.</h4>' +
            '<h5>Te adjuntamos el recibo de tu compra:</h5>';
        for (let p of publicaciones) {
            html = html + '<h5>Código: ' + p.id + '</h5>';
            html = html + '<h5>Artículo: ' + p.nombre + '</h5>';
            html = html + '<h5>Valor: CLP$' + p.precio + '</h5>';
            total = total + p.precio;
            let compra = new compraS({
                idusuario: idusuario,
                idpublicacion: p.id,
                fechaventa: new Date()
            });
            compra
                .save((data, err) => __awaiter(this, void 0, void 0, function* () {
                if (data) {
                    console.log(data);
                }
                else {
                    console.log(err);
                }
            }));
        }
        html = html + '<h5>Total: CLP$' + total + '</h5>';
        html = html + '</div>';
        console.log(html);
        return html;
    });
}
module.exports = compraC;
