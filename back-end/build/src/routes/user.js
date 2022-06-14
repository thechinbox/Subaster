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
let verify = require("../models/userS");
let userS = require("../models/userS");
let direccionS = require("../models/direccionUsuarioS");
let bcrypt = require("bcrypt");
//Registro y Login 
usuariosC.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield verify
        .find({ correo: req.body.correo })
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data.length == 0);
        if (data.length == 0) {
            yield addUser(req, res);
        }
        else {
            res.send({ status: "invalid" });
        }
    }))
        .catch((err) => {
        console.log("Entro al catch");
        console.log(err);
        res.send({ status: "invalid" });
    });
}));
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            .then((data2) => __awaiter(this, void 0, void 0, function* () {
            let d = yield saveDirection(data2._id, req.body.direccion);
            res.send(JSON.stringify(data2));
        }))
            .catch((err) => res.json(err, 'puta la wea'));
    });
}
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
                console.log("Error encontrado al ingresar direccion del Usuario");
                console.log(JSON.stringify(err));
                return (JSON.stringify(err));
            }
            return (JSON.stringify({ status: "ok", direccion: data }));
        });
    });
}
usuariosC.get("/login", (req, res) => {
    let email = req.query.correo;
    userS
        .findOne({ correo: email })
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data) {
            let validPassword = yield bcrypt.compare(req.query.contrasena, data.contrasena);
            if (validPassword) {
                let user = {
                    id: data._id,
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    correo: data.correo,
                    celular: data.celular,
                    contrasena: data.contrasena,
                    direccion: {
                        id: "",
                        region: " ",
                        comuna: " ",
                        direccion: "",
                        latitud: 0,
                        longitud: 0
                    },
                    fechacreacion: data.fechacreacion
                };
                res.send(user);
            }
            else {
                res.send(JSON.stringify({ status: "invalidpassword" }));
            }
        }
        else {
            res.send(JSON.stringify({ status: "invalid" }));
        }
    }))
        .catch((err) => {
        res.send(JSON.stringify({ status: "invalid" }));
    });
});
usuariosC.get("/loginid", (req, res) => {
    console.log(req.query.id);
    userS
        .findById(req.query.id)
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data) {
            let user = {
                id: data._id,
                nombre: data.nombre,
                apellidos: data.apellidos,
                correo: data.correo,
                celular: data.celular,
                contrasena: data.contrasena,
                direccion: {
                    id: "",
                    region: " ",
                    comuna: " ",
                    direccion: "",
                    latitud: 0,
                    longitud: 0
                },
                fechacreacion: data.fechacreacion
            };
            res.send(user);
        }
        else {
            res.send(JSON.stringify({ status: "no encontrado" }));
        }
    }))
        .catch((err) => {
        res.send(JSON.stringify({ status: "error al encontrar" }));
    });
});
usuariosC.get("/direccionUsuario", (req, res) => {
    direccionS
        .findOne({ idusuario: req.query.id }, (err, data) => {
        if (err) {
            console.log("Error encontrado al obtener direccion del Usuario");
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
        res.send(direccion);
    });
});
module.exports = usuariosC;
