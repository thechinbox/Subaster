"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const estadopC = index_js_1.express.Router();
let estadopS = require("../models/estadosproductosS");
//crear usuario
estadopC.post("/upestadoproducto", (req, res) => {
    estadopS(req.body)
        .save().
        then((data) => res.json(data))
        .catch((err) => res.json(err, 'puta la wea'));
});
estadopC.get("/getestadosp", (req, res) => {
    let estadosp = new Array();
    estadopS
        .find()
        .then((data) => {
        for (let i in data) {
            estadosp.push(data[i]);
        }
        res.send(estadosp);
    })
        .catch((err) => res.json({ message: err }));
});
module.exports = estadopC;
