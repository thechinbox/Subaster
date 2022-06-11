import {express} from '../index.js';
import { Direccion } from '../Interfaces/direccion.js';
import { User } from '../Interfaces/user.js';

const usuariosC = express.Router();
let verify = require("../models/userS");
let userS = require("../models/userS");

let direccionS= require("../models/direccionUsuarioS")
let bcrypt = require("bcrypt");


//crear usuario
usuariosC.post("/signup", async (req:any,res:any)=>{
    await verify
    .find({correo:req.body.correo})
    .then(async (data:any) =>{
        console.log(data.length == 0);
        if(data.length == 0){
            await addUser(req,res)
        }else{
            res.send({status:"invalid"})
        }
    })
    .catch((err:any) =>{
        console.log("Entro al catch");
        console.log(err);
        res.send({status:"invalid"})
    })
    
})

async function addUser(req:any,res:any) {
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
    .then(async (data2:any)=>{
        console.log(data2);
        
        let d:any = await saveDirection(data2._id,req.body.direccion)
        res.send(JSON.stringify(data2))
    })
    .catch((err:any) => res.json(err,'puta la wea'))
}

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
            console.log("Error encontrado al ingresar direccion del Usuario");
            console.log(JSON.stringify(err));
            return (JSON.stringify(err))
            
        } 
        return (JSON.stringify({status:"ok",direccion:data}))        
    })
}

usuariosC.get("/login", (req:any, res:any) =>{
    let email = req.query.correo;
    userS
    .findOne({correo: email})
    .then(async (data:any)=> {
        console.log(data);   
        if(data){
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
                res.send(JSON.stringify({status:"invalidpassword"}))
            }
        }else{
            res.send(JSON.stringify({status:"invalid"}))
        }
    })
    .catch((err:any) =>{
        res.send(JSON.stringify({status:"invalid"}))     
    })
    
})

usuariosC.get("/direccionUsuario",(req:any, res:any) =>{
    direccionS
    .findOne({idusuario:req.query.id}, (err:any, data:any) =>{
        if(err){
            console.log("Error encontrado al obtener direccion del Usuario");
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