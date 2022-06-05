"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const direccionespublicacionesS = index_js_1.mongoose.Schema({
    idpublicacion: {
        type: 'objectId'
    },
    region: {
        type: 'objectId'
    },
    comuna: {
        type: 'objectId'
    },
    direccion: {
        type: 'String'
    },
    latitud: {
        type: 'Number'
    },
    longitud: {
        type: 'Number'
    }
});
module.exports = index_js_1.mongoose.model('direccionespublicaciones', direccionespublicacionesS);
