"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const comunaC = index_js_1.express.Router();
let comunaS = require("../models/comunaS");
//crear usuario
comunaC.get("/getcomunas", (req, res) => {
    let comunas = new Array();
    let idregion = index_js_1.mongoose.Types.ObjectId(req.query.idregion);
    comunaS
        .find({ idregion: req.query.idregion })
        .then((data) => {
        for (let i in data) {
            comunas.push(data[i]);
        }
        res.send(comunas);
    })
        .catch((err) => res.json({ message: err }));
});
module.exports = comunaC;
