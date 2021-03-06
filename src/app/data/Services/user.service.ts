import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publish } from '../Interfaces/publish';
import { User } from '../Interfaces/user';
import { Output,EventEmitter } from '@angular/core';
import { AttributesService } from './attributes.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter()

  HttpUploadOptions = {
    headers: new HttpHeaders(
      {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Content-Type': 'application/json',
    }
    ),
  };

  user:User;
  compras:Array<String>

  constructor(private http:HttpClient, private attributes:AttributesService) {
    this.user = {
      id: "",
      nombre:"",
      apellidos:"",
      correo:"",
      celular:0,
      contrasena:"",
      direccion: {
          id:"",
          region:" ",
          comuna:" ",
          direccion:"",
          latitud:0,
          longitud:0
      },
      fechacreacion: new Date()
    }
    this.compras = new Array()
    try{
      let aux :any = sessionStorage.getItem("products")
      console.log(aux);
      
      for(let id of JSON.parse(aux).ids){
        this.compras.push(id)
      }
    }catch(error){
      console.log(error);
    }
    if(sessionStorage.getItem("id") != null && sessionStorage.getItem("id") != undefined){
      this.LOGINID(sessionStorage.getItem("id")).subscribe(data =>{
        this.user = data
        this.GETDIRECCION(sessionStorage.getItem("id")).subscribe(data =>{
          this.user.direccion = data
          this.fireIsLoggedIn.emit(sessionStorage.getItem("id"))
        })
      })
    }else{
      
    }
    
  }

  SIGNUP(user:User):Observable<any>{
    return this.http.post(`${environment.hostname}/signup`,JSON.stringify(user),this.HttpUploadOptions)
  }

  LOGIN(correo:any, contrasena:any):Observable<any>{
    return this.http.get(`${environment.hostname}/login?correo=`+correo+"&contrasena="+contrasena,this.HttpUploadOptions)
  }
  LOGINID(id:any):Observable<any>{
    return this.http.get(`${environment.hostname}/loginid?id=`+id,this.HttpUploadOptions)
  }
  GETDIRECCION(id:any):Observable<any>{
    return this.http.get(`${environment.hostname}/direccionUsuario?id=`+id,this.HttpUploadOptions)
  }
  BUY(productos:any, cantidadesC:any):Observable<any>{
    let inactivo:any = this.attributes.getinactivepubid()
    let activo:any = this.attributes.getactivepub()
    return this.http.post(`${environment.hostname}/buy`,JSON.stringify({
      user:this.user,productos:productos, inactivo:inactivo,activo:activo, cantidad:cantidadesC}),this.HttpUploadOptions)
  }
  VERIFYEMAIL(correo:string):Observable<any>{
    return this.http.get(`${environment.hostname}/recover?correo=`+correo, this.HttpUploadOptions)
  }
  EMAILRECOVERY(toEmail:string, emailHTML:string): Observable<any>{
    return this.http.post(`${environment.hostname}/enviarcorreo`,JSON.stringify({to: toEmail, emailTemplate: emailHTML}), this.HttpUploadOptions);
  }

  setUsuario(user:User){
    this.user = user;
    sessionStorage.setItem("id", user.id)
    this.fireIsLoggedIn.emit(sessionStorage.getItem("id"))
  }

  getEmiter(){
    return this.fireIsLoggedIn;
  }
  refreshProducts(){
    this.compras = new Array();
    let aux :any = sessionStorage.getItem("products")
    for(let id of JSON.parse(aux).ids){
      this.compras.push(id)
    }
  }
  resetProducts(){
    this.compras = new Array()
  }
  getUser(){
    return this.user;
  }

  async addProduct(id:any){
    let exist = false;
    for(let compra of this.compras){
      if(compra.split("&cantidad=")[0] == id.split("&cantidad=")[0]){
        exist = true;
      }
    }
    if(!exist){
      this.compras.push(id)
      sessionStorage.removeItem("products")
      sessionStorage.setItem("products", JSON.stringify({ids:this.compras}))
      return true;
    }
    return false;
  }

  obtenerUsuario():User {
    let ejemplo: User = {
      "id": "",
      "nombre": "Fernando",
      "apellidos": "Espinoza",
      "direccion":{
        "id":"",
        "region":"",
        "comuna":"",
        "direccion":"",
        "latitud":0,
        "longitud":0
      },
      "correo": "espinoza@gmail.com",
      "fechacreacion":new Date(),
      "contrasena": "hola123",
      "celular":0
    }
    return ejemplo;
  }
}
