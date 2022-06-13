export const express= require('express')
export const mongoose = require("mongoose")
const app = express();
const correo = require('./routes/emailer')
const usuarios = require("./routes/user")
const publicaciones = require("./routes/publication")
const categorias = require("./routes/categorias")
const unidades = require("./routes/unidades")
const estadosp = require("./routes/estadosproductos")
const estados = require("./routes/estadospublicacion")
const regiones = require("./routes/region")
const comunas = require("./routes/comuna")
const compra = require("./routes/compra")
const cors=require('cors');

const configuracion={
   hostname: "127.0.0.1",
   port: 8080,
}

require('dotenv').config();

app.use(express.json())
app.use(cors())

app.use('/',usuarios)
app.use('/',publicaciones)
app.use('/',categorias)
app.use('/',unidades)
app.use('/',estadosp)
app.use('/',estados)
app.use('/',regiones)
app.use('/',comunas)
app.use('/',correo)
app.use('/',compra)


app.listen(configuracion, () => {
   console.log(`Conectando al servidor http://${configuracion.hostname}:${configuracion.port}`)
})

mongoose
.connect('mongodb+srv://user2:user2@cluster0.cvp5f.mongodb.net/Subaster?retryWrites=true&w=majority')
.then(()=>console.log("YEP"))
.catch((error:any)=> console.log(error)
)

