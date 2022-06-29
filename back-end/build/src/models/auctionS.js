"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const auctionS = index_js_1.mongoose.Schema({
    nombre: {
        type: 'string'
    },
    descripcion: {
        type: 'string'
    },
    categoria: {
        type: 'objectId'
    },
    estadoproducto: {
        type: 'objectId'
    },
    estadopublicacion: {
        type: 'objectId'
    },
    unidad: {
        type: 'objectId'
    },
    fechapublicacion: {
        type: 'date'
    },
    fechafinalizacion: {
        type: 'date'
    },
    precioinicial: {
        type: 'Number'
    },
    cantidad: {
        type: 'Number'
    },
    iddireccion: {
        type: 'objectId'
    }
});
module.exports = index_js_1.mongoose.model('subastas', auctionS);
