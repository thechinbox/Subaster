import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publish } from '../Interfaces/publish';
import { User } from '../Interfaces/user';
import { Output,EventEmitter } from '@angular/core';


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

  constructor(private http:HttpClient) {
    this.compras = new Array()
    try{
      let aux :any = sessionStorage.getItem("products")
      for(let id of JSON.parse(aux).ids){
        this.compras.push(id)
      }
    }catch(error){
      console.log(error);
    }
    try{
      this.LOGINID(sessionStorage.getItem("id")).subscribe(data =>{
        this.user = data
      })
    }catch(err){
      console.log(err);

    }
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
  BUY(productos:any):Observable<any>{
    return this.http.post(`${environment.hostname}/buy`,JSON.stringify({user:this.user,productos:productos}),this.HttpUploadOptions)
  }

  setUsuario(user:User){
    this.user = user;
    sessionStorage.setItem("id", user.id)
    this.fireIsLoggedIn.emit(sessionStorage.getItem("id"))
  }

  getEmiter(){
    return this.fireIsLoggedIn;
  }

  resetProducts(){
    this.compras = new Array()
  }
  getUser(){
    return this.user;
  }

  async addProduct(id:any){
    if(!this.compras.includes(id)){
      this.compras.push(id)
      console.log(this.compras);

      sessionStorage.removeItem("products")
      sessionStorage.setItem("products", JSON.stringify({ids:this.compras}))
    }
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
