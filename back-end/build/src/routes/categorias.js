"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const cateogoriasC = index_js_1.express.Router();
let cateogoriasS = require("../models/categoriasS");
//crear usuario
cateogoriasC.post("/upcategoria", (req, res) => {
    cateogoriasS(req.body)
        .save().
        then((data) => res.json(data))
        .catch((err) => res.json(err, 'puta la wea'));
});
cateogoriasC.get("/getcategorias", (req, res) => {
    let cateogorias = new Array();
    cateogoriasS
        .find()
        .then((data) => {
        for (let i in data) {
            cateogorias.push(data[i]);
        }
        return cateogorias;
    })
        .catch((err) => res.json({ message: err }));
});
module.exports = cateogoriasC;
