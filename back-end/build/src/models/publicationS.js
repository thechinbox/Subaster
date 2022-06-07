"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const publicationS = index_js_1.mongoose.Schema({
    idpublicacion: {
        type: 'objectId'
    },
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
    precio: {
        type: 'Number'
    },
    cantidad: {
        type: 'Number'
    },
    iddireccion: {
        type: 'objectId'
    },
    idcontenido: {
        type: 'objectId'
    }
});
module.exports = index_js_1.mongoose.model('fijas', publicationS);
