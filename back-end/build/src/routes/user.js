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
const usuariosC = index_js_1.express.Router();
let userS = require("../models/userS");
let direccionS = require("../models/direccionUsuarioS");
let bcrypt = require("bcrypt");
//crear usuario
usuariosC.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new userS({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        celular: req.body.celular,
        fechacreacion: req.body.fechacreacion,
    });
    let salt = yield bcrypt.genSalt(10);
    user.contrasena = yield bcrypt.hash(req.body.contrasena, salt);
    user
        .save()
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        let d = yield saveDirection(data._id, req.body.direccion);
        res.send(JSON.stringify(data));
    }))
        .catch((err) => res.json(err, 'puta la wea'));
}));
function saveDirection(idusuario, direccion) {
    return __awaiter(this, void 0, void 0, function* () {
        let d = new direccionS({
            idusuario: idusuario,
            region: direccion.region,
            comuna: direccion.comuna,
            direccion: direccion.direccion,
            latitud: direccion.latitud,
            longitud: direccion.longitud
        });
        d.save((err, data) => {
            if (err) {
                console.log("Error encontrado.");
                console.log(JSON.stringify(err));
                return (JSON.stringify(err));
            }
            return (JSON.stringify({ status: "ok", direccion: data }));
        });
    });
}
usuariosC.get("/login", (req, res) => {
    console.log(req.query.correo);
    userS
        .findOne({ correo: "ejemplo@gmail.com" })
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data);
        if (data) {
            console.log(data);
            let validPassword = yield bcrypt.compare(req.query.contrasena, data.contrasena);
            if (validPassword) {
                yield getDireccion(data._id).then(data2 => {
                    res.send(JSON.stringify({ usuario: data, direccion: data2 }));
                });
            }
            else {
                res.send(JSON.stringify({ status: "Contraseña Invalida" }));
            }
        }
    }))
        .catch((err) => {
        res.send(JSON.stringify(err));
    });
});
function getDireccion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        direccionS
            .findOne({ idusuario: id }, (err, data) => {
            if (err) {
                console.log("Error encontrado al obtener iddireccion en publicacion");
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
            return direccion;
        });
    });
}
module.exports = usuariosC;
