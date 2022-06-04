"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const index_js_2 = require("../index.js");
const publishC = index_js_1.express.Router();
let publicationS = require("../models/publicationS");
let getunidad = require("./unidades");
//crear usuario
publishC.post("/publish", (req, res) => {
    req.body.categoria = index_js_2.mongoose.Types.ObjectId(req.body.categoria);
    req.body.estadoproducto = index_js_2.mongoose.Types.ObjectId(req.body.estadoproducto);
    req.body.unidad = index_js_2.mongoose.Types.ObjectId(req.body.unidad);
    req.body.tipoventa = index_js_2.mongoose.Types.ObjectId(req.body.tipoventa);
    publicationS(req.body)
        .save()
        .then((data) => {
        data = res.json(data);
    })
        .catch((err) => res.json(err, 'puta la wea'));
});
publishC.get("/getpublicaciones", (req, res) => {
    publicationS
        .find(req.query)
        .then((data) => {
        console.log(data);
    })
        .catch((err) => {
        console.log("Error encontrado");
        res.json(err);
    });
});
module.exports = publishC;
