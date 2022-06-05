"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const estadospublicacionSchema = index_js_1.mongoose.Schema({
    nombre: {
        type: 'string'
    }
});
module.exports = index_js_1.mongoose.model('estadospublicaciones', estadospublicacionSchema);
