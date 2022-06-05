"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const unidadC = index_js_1.express.Router();
let unidadS = require("../models/unidadesS");
//crear usuario
unidadC.post("/upunidad", (req, res) => {
    unidadS(req.body)
        .save().
        then((data) => res.json(data))
        .catch((err) => res.json(err));
});
unidadC.get("/getunidades", (req, res) => {
    let unidades = new Array();
    unidadS
        .find()
        .then((data) => {
        for (let i in data) {
            unidades.push(data[i]);
        }
        res.send(unidades);
    })
        .catch((err) => res.json({ message: err }));
});
module.exports = unidadC;
