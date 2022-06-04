export const express= require('express')
export const mongoose = require("mongoose")
const app = express();
const usuarios = require("./routes/user")
const publicaciones = require("./routes/publication")
const categorias = require("./routes/categorias")
const unidades = require("./routes/unidades")
const estadosp = require("./routes/estadosproductos")


const configuracion={
   hostname: "127.0.0.1",
   port: 8080,
}

require('dotenv').config();

app.set('port','8080')
app.use(express.json())

app.use('/',usuarios)
app.use('/',publicaciones)
app.use('/',categorias)
app.use('/',unidades)
app.use('/',estadosp)


app.listen(configuracion, () => {
   console.log(`Conectando al servidor http://${configuracion.hostname}:${configuracion.port}`)
})

mongoose
.connect('mongodb+srv://user1:0gWv6USyxnKovRBo@cluster0.cvp5f.mongodb.net/Subaster?retryWrites=true&w=majority')
.then(()=>console.log("YEP"))
.catch((error:any)=> console.log(error)
)

