"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const estadosprodcutosSchema = index_js_1.mongoose.Schema({
    id: {
        type: 'string'
    },
    nombre: {
        type: 'string'
    }
});
module.exports = index_js_1.mongoose.model('estadosproductos', estadosprodcutosSchema);
