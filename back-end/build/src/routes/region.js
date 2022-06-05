"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const regionC = index_js_1.express.Router();
let regionS = require("../models/regionS");
//crear usuario
regionC.post("/upregion", (req, res) => {
    regionS(req.body)
        .save().
        then((data) => res.json(data))
        .catch((err) => res.json(err));
});
regionC.get("/getregiones", (req, res) => {
    let regiones = new Array();
    regionS
        .find()
        .then((data) => {
        for (let i in data) {
            regiones.push(data[i]);
        }
        res.send(regiones);
    })
        .catch((err) => res.json({ message: err }));
});
module.exports = regionC;
