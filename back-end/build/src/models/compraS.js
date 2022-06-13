"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const compraSchema = index_js_1.mongoose.Schema({
    idventa: {
        type: 'ObjectId'
    },
    idpublicacion: {
        type: 'ObjectId'
    },
    idusuario: {
        type: 'ObjectId'
    },
    fechaventa: {
        type: 'date'
    }
});
module.exports = index_js_1.mongoose.model('ventas', compraSchema);
