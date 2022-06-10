import {express} from '../index.js';
import { Direccion } from '../Interfaces/direccion.js';
import { User } from '../Interfaces/user.js';

const usuariosC = express.Router();
let userS = require("../models/userS");
let direccionS= require("../models/direccionUsuarioS")
let bcrypt = require("bcrypt");


//crear usuario
usuariosC.post("/signup", async (req:any,res:any)=>{
    let user =  new userS({
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        correo:req.body.correo,
        celular:req.body.celular,
        fechacreacion:req.body.fechacreacion,
    })
    let salt = await bcrypt.genSalt(10);
    user.contrasena = await bcrypt.hash(req.body.contrasena, salt);
    user
    .save()
    .then(async (data:any)=>{
        let d:any = await saveDirection(data._id,req.body.direccion)
        res.send(JSON.stringify(data))
    })
    .catch((err:any) => res.json(err,'puta la wea'))
})

async function saveDirection(idusuario:any, direccion:Direccion){
    let d =  new direccionS({
        idusuario:idusuario,
        region:direccion.region,
        comuna: direccion.comuna,
        direccion:direccion.direccion,
        latitud:direccion.latitud,
        longitud:direccion.longitud
    })
    d.save((err:any,data:any) =>{
        if(err){
            console.log("Error encontrado.");
            console.log(JSON.stringify(err));
            return (JSON.stringify(err))
            
        } 
        return (JSON.stringify({status:"ok",direccion:data}))        
    })
}

usuariosC.get("/login", (req:any, res:any) =>{
    console.log(req.query.correo);
    
    userS
    .findOne({correo: "ejemplo@gmail.com"})
    .then(async (data:any)=> {
        console.log(data);
        if(data){
            console.log(data);
            let validPassword = await bcrypt.compare(req.query.contrasena, data.contrasena);
            if(validPassword){               
                let user:User = {
                id: data._id,
                nombre:data.nombre,
                apellidos:data.apellidos,
                correo:data.correo,
                celular:data.celular,
                contrasena:data.contrasena,
                direccion: {
                    id:"",
                    region:" ",
                    comuna:" ",
                    direccion:"",
                    latitud:0,
                    longitud:0
                },
                fechacreacion:data.fechacreacion
                }
                res.send(user)
            }else{
                res.send(JSON.stringify({status:"Contraseña Invalida"}))
            }
        }
    })
    .catch((err:any) =>{
        res.send(JSON.stringify(err))     
    })
    
})

usuariosC.get("/direccionUsuario",(req:any, res:any) =>{
    direccionS
    .findOne({idusuario:req.query.id}, (err:any, data:any) =>{
        if(err){
            console.log("Error encontrado al obtener iddireccion en publicacion");
            console.log(err);            
        }
        let direccion:Direccion = {
            id:data._id,
            region:data.region,
            comuna:data.comuna,
            direccion:data.direccion,
            latitud:data.latitud,
            longitud:data.longitud
        }    
        res.send(direccion);    
    })
})
module.exports = usuariosC;