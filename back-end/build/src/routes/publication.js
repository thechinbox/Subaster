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
//Publicar Producto
publishC.post("/publish", (req, res) => {
    let infopublicacion = req.body;
    let direccion = infopublicacion.direccion;
    publicationS(infopublicacion)
        .save()
        .then((data) => {
        let continues = saveDirection(data._id, direccion, res);
    })
        .catch((err) => {
        res.send(JSON.stringify({ status: err }));
    });
});
//Crear direccion asociada al producto
function saveDirection(idpublicacion, direccion, res) {
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
                console.log(err);
            }
            let update = updatePublication(idpublicacion, data._id, res);
            return JSON.stringify(update);
        });
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
    publicationS
        .find(req.query)
        .then((data) => {
        res.send(JSON.stringify(data));
    })
        .catch((err) => {
        console.log("Error encontrado");
        res.json(err);
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
