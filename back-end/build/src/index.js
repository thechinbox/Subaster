"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.express = void 0;
exports.express = require('express');
exports.mongoose = require("mongoose");
const app = (0, exports.express)();
const correo = require('./routes/emailer');
const usuarios = require("./routes/user");
const publicaciones = require("./routes/publication");
const categorias = require("./routes/categorias");
const unidades = require("./routes/unidades");
const estadosp = require("./routes/estadosproductos");
const estados = require("./routes/estadospublicacion");
const regiones = require("./routes/region");
const comunas = require("./routes/comuna");
const compra = require("./routes/compra");
const subastas = require("./routes/subastas");
const cors = require('cors');
const configuracion = {
    hostname: "127.0.0.1",
    port: 8080,
};
require('dotenv').config();
app.use(exports.express.json());
app.use(cors());
app.use('/', usuarios);
app.use('/', publicaciones);
app.use('/', categorias);
app.use('/', unidades);
app.use('/', estadosp);
app.use('/', estados);
app.use('/', regiones);
app.use('/', comunas);
app.use('/', correo);
app.use('/', compra);
app.use('/', subastas);
app.listen(configuracion, () => {
    console.log(`Conectando al servidor http://${configuracion.hostname}:${configuracion.port}`);
});
exports.mongoose
    .connect('mongodb+srv://user2:user2@cluster0.cvp5f.mongodb.net/Subaster?retryWrites=true&w=majority')
    .then(() => console.log("YEP"))
    .catch((error) => console.log(error));
