"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const unidadesSchema = index_js_1.mongoose.Schema({
    id: {
        type: 'string'
    },
    unidad: {
        type: 'string'
    }
});
module.exports = index_js_1.mongoose.model('unidadesproductos', unidadesSchema);
