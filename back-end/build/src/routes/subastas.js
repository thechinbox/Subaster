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
const auctionC = index_js_1.express.Router();
let auctionS = require("../models/auctionS");
let direccionS = require("../models/direccionS");
let contentS = require("../models/contentS");
let estadoS = require("../models/estadospublicacionS");
let pujaS = require("../models/pujaS");
//Modulo que permite el envio de correos a gmail
let { google } = require('googleapis');
let nodemailer = require("nodemailer");
let REFRESH_TOKEN = "1//04OY1_12rLq02CgYIARAAGAQSNwF-L9IrfTgit-rx0rwo_FINCuFE3CYr_t-0okHvq_0sZWHjdqycRx7WSFLWcz193MHLuqSpzFU";
let CLIENT_ID = "90357140452-qdmaul0i29hco6122uhqs7oielejdcmm.apps.googleusercontent.com";
let CLIENT_SECRET = "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";
let userMail = "testsubaster@gmail.com";
let REDIRECT_URI = "https://developers.google.com/oauthplayground"; // NO CAMBIAR
let oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI); // NO CAMBIAR
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN }); // NO CAMBIAR
auctionC.post("/auction", (req, res) => {
    let infopublicacion = req.body;
    let direccion = infopublicacion.direccion;
    let media = infopublicacion.url;
    auctionS(infopublicacion)
        .save()
        .then((data) => {
        let direccionUpload = saveDirectionA(data._id, direccion, media, res);
    })
        .catch((err) => {
        res.send(JSON.stringify({ status: err }));
    });
});
//Crear direccion asociada a la subasta
function saveDirectionA(id, direccion, media, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let d = new direccionS({
            idpublicacion: id,
            region: direccion.region,
            comuna: direccion.comuna,
            direccion: direccion.direccion,
            latitud: direccion.latitud,
            longitud: direccion.longitud
        });
        d.save((err, data) => {
            if (err) {
                console.log("Error encontrado.");
                res.send(JSON.stringify(err));
            }
            saveContentA(id, data._id, media, res);
        });
    });
}
//Crear contenidos asociados a la subasta
function saveContentA(idpublicacion, iddireccion, urls, res) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let url of urls) {
            let urlUpload = new contentS({
                idpublicacion: idpublicacion,
                url: url.url
            });
            urlUpload.save((err, data) => {
                if (err) {
                    console.log(err);
                    res.send(JSON.stringify(err));
                }
            });
        }
        let update = updatePublicationA(idpublicacion, iddireccion, res);
        return JSON.stringify(update);
    });
}
//Añadir la direccion asociada al producto.
function updatePublicationA(idpublicacion, iddireccion, res) {
    return __awaiter(this, void 0, void 0, function* () {
        ;
        auctionS
            .findOneAndUpdate({ _id: idpublicacion }, { $set: { iddireccion: iddireccion } }, (err, data) => {
            if (err) {
                console.log("Error encontrado al añadir iddireccion en publicacion");
                console.log(err);
            }
            res.send(JSON.stringify(data));
        });
    });
}
auctionC.get("/getsubastas", (req, res) => {
    estadoS
        .findOne({ estadopublicacion: "activa" })
        .then((data) => {
        let publicaciones = new Array();
        auctionS
            .find({ estadopublicacion: data._id })
            .then((data) => {
            for (let publicacion of data) {
                let p = {
                    id: publicacion._id,
                    nombre: publicacion.nombre,
                    descripcion: publicacion.descripcion,
                    categoria: publicacion.categoria,
                    unidad: publicacion.unidad,
                    estadopublicacion: publicacion.estadopublicacion,
                    estadoproducto: publicacion.estadoproducto,
                    fechapublicacion: publicacion.fechapublicacion,
                    fechafinalizacion: publicacion.fechafinalizacion,
                    precioinicial: publicacion.precioinicial,
                    cantidad: publicacion.cantidad,
                    direccion: {
                        id: publicacion.iddireccion,
                        region: " ",
                        comuna: " ",
                        direccionS: " ",
                        latitud: 0,
                        longitud: 0
                    },
                    url: new Array()
                };
                publicaciones.push(p);
            }
            res.send(JSON.stringify(publicaciones));
        })
            .catch((err) => {
            console.log("Error encontrado");
            res.json(err);
        });
    })
        .catch((err) => res.json({ message: err }));
});
auctionC.get("/getauctionsid", (req, res) => {
    estadoS
        .findOne({ estadopublicacion: "activa" })
        .then((data) => {
        let publicaciones = new Array();
        let idsQuery = new Array();
        for (let id of req.query.categoria.split(",")) {
            if (id != "") {
                idsQuery.push(id);
            }
        }
        auctionS
            .find({ categoria: idsQuery, estadopublicacion: data._id })
            .then((data) => {
            for (let publicacion of data) {
                let p = {
                    id: publicacion._id,
                    nombre: publicacion.nombre,
                    descripcion: publicacion.descripcion,
                    categoria: publicacion.categoria,
                    unidad: publicacion.unidad,
                    estadopublicacion: publicacion.estadopublicacion,
                    estadoproducto: publicacion.estadoproducto,
                    fechapublicacion: publicacion.fechapublicacion,
                    fechafinalizacion: publicacion.fechafinalizacion,
                    precioinicial: publicacion.precioinicial,
                    cantidad: publicacion.cantidad,
                    direccion: {
                        id: publicacion.iddireccion,
                        region: " ",
                        comuna: " ",
                        direccionS: " ",
                        latitud: 0,
                        longitud: 0
                    },
                    url: new Array()
                };
                publicaciones.push(p);
            }
            res.send(JSON.stringify(publicaciones));
        })
            .catch((err) => {
            console.log("Error encontrado");
            res.json(err);
        });
    })
        .catch((err) => res.json({ message: err }));
});
auctionC.get("/getsubasta", (req, res) => {
    console.log(req.query.cantidad);
    auctionS
        .findById(req.query.id)
        .then((publicacion) => {
        let p = {
            id: publicacion._id,
            nombre: publicacion.nombre,
            descripcion: publicacion.descripcion,
            categoria: publicacion.categoria,
            unidad: publicacion.unidad,
            estadopublicacion: publicacion.estadopublicacion,
            estadoproducto: publicacion.estadoproducto,
            fechapublicacion: publicacion.fechapublicacion,
            fechafinalizacion: publicacion.fechafinalizacion,
            precioinicial: publicacion.precioinicial,
            cantidad: publicacion.cantidad,
            direccion: {
                id: publicacion.iddireccion,
                region: " ",
                comuna: " ",
                direccionS: " ",
                latitud: 0,
                longitud: 0
            },
            url: new Array()
        };
        res.send(JSON.stringify(p));
    })
        .catch((err) => {
        res.json(err);
    });
});
auctionC.get("/getpujas", (req, res) => {
    pujaS
        .find({ idpublicacion: req.query.id })
        .then((pujas) => {
        res.send(JSON.stringify(pujas));
    })
        .catch((err) => {
        res.json(err);
    });
});
auctionC.get("/getmaxpuja", (req, res) => {
    pujaS
        .findOne({ idpublicacion: req.query.id }).sort("-valorpuja")
        .then((puja) => {
        if (puja == null) {
            res.send(JSON.stringify(puja));
        }
        else {
            res.send(JSON.stringify(puja.valorpuja));
        }
    })
        .catch((err) => {
        res.json(err);
    });
});
auctionC.post("/uppuja", (req, res) => {
    let body = req.body.puja;
    let subasta = req.body.subasta;
    let puja = new pujaS({
        idpublicacion: body.idpublicacion,
        idusuario: body.idusuario,
        valorpuja: body.valorpuja,
        fechapuja: body.fechapuja
    });
    pujaS(puja)
        .save()
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        let mail = {
            from: "Subaster",
            to: req.body.user.correo,
            subject: "Subaster - Recibo de Puja",
            html: '<div style="text-align: center;">' +
                '<h1>Subaster</h1>' +
                '<h4 style="margin-top: 20px">¡Hola! Te dejamos los datos de la puja que haz realizado:.</h4>' +
                '<h5>Producto: ' + subasta.nombre + '</h5>' +
                '<h5>Codigo de Puja: ' + data._id + '</h5>' +
                '<h5>Valor de Puja: ' + data.valorpuja + '</h5>' +
                '<h5>Fecha de Puja: ' + data.fechapuja + '</h5></div>'
        };
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
    }))
        .catch((err) => {
        res.json(err);
    });
});
module.exports = auctionC;
