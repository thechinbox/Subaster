"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const regionSchema = index_js_1.mongoose.Schema({
    region: {
        type: 'string'
    }
});
module.exports = index_js_1.mongoose.model('regiones', regionSchema);
