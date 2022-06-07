"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const estadospublicacionC = index_js_1.express.Router();
let estadospublicacionS = require("../models/estadospublicacionS");
//crear usuario
estadospublicacionC.get("/getestadospublicacion", (req, res) => {
    let estados = new Array();
    estadospublicacionS
        .find({ idregion: req.query.idregion })
        .then((data) => {
        for (let i in data) {
            estados.push(data[i]);
        }
        res.send(estados);
    })
        .catch((err) => res.json({ message: err }));
});
module.exports = estadospublicacionC;
