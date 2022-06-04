"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const userSchema = index_js_1.mongoose.Schema({
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
    contraseña: {
        type: 'string'
    },
    fechacreacion: {
        type: 'date'
    }
});
module.exports = index_js_1.mongoose.model('usuario', userSchema);
