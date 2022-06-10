"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const userSchema = index_js_1.mongoose.Schema({
    idusuario: {
        type: 'objectId'
    },
    nombre: {
        type: 'string'
    },
    apellidos: {
        type: 'string'
    },
    correo: {
        type: 'string'
    },
    celular: {
        type: 'Number'
    },
    contrasena: {
        type: 'string'
    },
    fechacreacion: {
        type: 'date'
    }
});
module.exports = index_js_1.mongoose.model('usuarios', userSchema);
