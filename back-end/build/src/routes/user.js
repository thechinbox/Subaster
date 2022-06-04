"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const usuariosC = index_js_1.express.Router();
let userS = require("../models/userS");
//crear usuario
usuariosC.post("/signup", (req, res) => {
    userS(req.body)
        .save()
        .then((data) => {
        res.json(data);
    })
        .catch((err) => res.json(err, 'puta la wea'));
});
module.exports = usuariosC;
