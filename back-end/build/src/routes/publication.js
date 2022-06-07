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
const publishC = index_js_1.express.Router();
let publicationS = require("../models/publicationS");
let direccionS = require("../models/direccionS");
let contentS = require("../models/contentS");
//Publicar Producto
publishC.post("/publish", (req, res) => {
    let infopublicacion = req.body;
    let direccion = infopublicacion.direccion;
    let media = infopublicacion.url;
    console.log(media);
    publicationS(infopublicacion)
        .save()
        .then((data) => {
        let direccionUpload = saveDirection(data._id, direccion, media, res);
    })
        .catch((err) => {
        res.send(JSON.stringify({ status: err }));
    });
});
//Crear direccion asociada al producto
function saveDirection(idpublicacion, direccion, media, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let d = new direccionS({
            idpublicacion: idpublicacion,
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
            saveContent(idpublicacion, data._id, media, res);
        });
    });
}
//Crear contenidos asociados al producto
function saveContent(idpublicacion, iddireccion, urls, res) {
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
                console.log("Se subio: ", data);
            });
        }
        let update = updatePublication(idpublicacion, iddireccion, res);
        return JSON.stringify(update);
    });
}
//Añadir la direccion asociada al producto.
function updatePublication(idpublicacion, iddireccion, res) {
    return __awaiter(this, void 0, void 0, function* () {
        ;
        publicationS
            .findOneAndUpdate({ _id: idpublicacion }, { $set: { iddireccion: iddireccion } }, (err, data) => {
            if (err) {
                console.log("Error encontrado al añadir iddireccion en publicacion");
                console.log(err);
            }
            res.send(JSON.stringify(data));
        });
    });
}
publishC.get("/getpublicaciones", (req, res) => {
    let publicaciones = new Array();
    publicationS
        .find(req.query)
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
                precio: publicacion.precio,
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
        console.log(publicaciones);
        res.send(JSON.stringify(publicaciones));
    })
        .catch((err) => {
        console.log("Error encontrado");
        res.json(err);
    });
});
publishC.get("/getdireccion", (req, res) => {
    direccionS
        .findOne({ _id: { $gte: req.query.id } }, (err, data) => {
        if (err) {
            console.log("Error encontrado al añadir iddireccion en publicacion");
            console.log(err);
        }
        let direccion = {
            id: data._id,
            region: data.region,
            comuna: data.comuna,
            direccion: data.direccion,
            latitud: data.latitud,
            longitud: data.longitud
        };
        console.log(direccion);
        res.send(direccion);
    });
});
publishC.get("/getpublicacion", (req, res) => {
    publicationS
        .find(req.query)
        .then((data) => {
        res.send(JSON.stringify(data));
    })
        .catch((err) => {
        res.json(err);
    });
});
module.exports = publishC;
