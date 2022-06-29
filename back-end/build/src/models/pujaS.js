"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const pujaS = index_js_1.mongoose.Schema({
    idpublicacion: {
        type: 'objectId'
    },
    idusuario: {
        type: 'objectId'
    },
    valorpuja: {
        type: 'number'
    },
    fechapuja: {
        type: 'date'
    }
});
module.exports = index_js_1.mongoose.model('pujassubastas', pujaS);
