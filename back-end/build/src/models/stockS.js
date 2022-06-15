"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const stockSchema = index_js_1.mongoose.Schema({
    idstock: {
        type: 'objectId'
    },
    idpublicacion: {
        type: 'objectId'
    },
    idestado: {
        type: 'objectId'
    }
});
module.exports = index_js_1.mongoose.model('stocks', stockSchema);
