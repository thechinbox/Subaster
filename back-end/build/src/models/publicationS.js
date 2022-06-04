"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const publicationS = index_js_1.mongoose.Schema({
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
    unidad: {
        type: 'objectId'
    },
    fechapublicacion: {
        type: 'date'
    },
    tipoventa: {
        type: 'objectId'
    }
});
module.exports = index_js_1.mongoose.model('publicaciones', publicationS);
