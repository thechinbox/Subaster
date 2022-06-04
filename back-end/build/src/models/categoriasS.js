"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const categoriaSchema = index_js_1.mongoose.Schema({
    id: {
        type: 'string'
    },
    estado: {
        type: 'string'
    }
});
module.exports = index_js_1.mongoose.model('categoriasproductos', categoriaSchema);
