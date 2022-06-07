"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const contentSchema = index_js_1.mongoose.Schema({
    idpublicacion: {
        type: 'ObjectId'
    },
    url: {
        type: 'string'
    }
});
module.exports = index_js_1.mongoose.model('contenidos', contentSchema);
