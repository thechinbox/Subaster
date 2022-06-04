"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const region = index_js_1.express.Router();
let regionS = require("../models/regionS");
//crear usuario
region.post("/upregion", (req, res) => {
    regionS(req.body)
        .save().
        then((data) => res.json(data))
        .catch((err) => res.json(err));
});
module.exports = region;
