"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const comunaSchema = index_js_1.mongoose.Schema({
    comuna: {
        type: 'string'
    },
    idregion: {
        type: 'ObjectId'
    }
});
module.exports = index_js_1.mongoose.model('comunas', comunaSchema);
