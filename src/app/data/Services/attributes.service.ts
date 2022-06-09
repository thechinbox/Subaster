import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Categoria } from '../Interfaces/categoria';
import { Estadoproducto } from '../Interfaces/estadoproducto';
import { Unidad } from '../Interfaces/unidad';
import { Estadopublicacion } from '../Interfaces/estadopublicacion';
@Injectable({
  providedIn: 'root'
})
export class AttributesService {
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

  unidades:Array<Unidad>;
  estadosproducto:Array<Estadoproducto>;
  estadospublicacion:Array<Estadopublicacion>;
  categorias:Array<Categoria>;

  constructor(private http:HttpClient) {
    this.unidades = new Array<Unidad>();
    this.estadosproducto = new Array<Estadoproducto>();
    this.estadospublicacion = new Array<Estadopublicacion>();
    this.categorias = new Array<Categoria>();
    this.GETUNIDADES().subscribe(data => {
      for(let i in data){
       this.unidades.push({id:data[i]._id, unidad:data[i].unidad})
      }
    })
    this.GETESTDOSP().subscribe(data => {
      for(let i in data){
       this.estadosproducto.push({id:data[i]._id, estadoproducto:data[i].estado})
      }
    })
    this.GETCATEGORIAS().subscribe(data => {
      for(let i in data){
         this.categorias.push({id:data[i]._id, categoria:data[i].categoria})
      }
    })
    this.GETESTADOS().subscribe(data => {
      for(let i in data){
       this.estadospublicacion.push({id:data[i]._id, estadopublicacion:data[i].estadopublicacion})
      }
    })
  }

  GETUNIDADES():Observable<any>{
    return this.http.get(`${environment.hostname}/getunidades`,this.HttpUploadOptions);
  }

  GETESTDOSP():Observable<any>{
    return this.http.get(`${environment.hostname}/getestadosp`,this.HttpUploadOptions);
  }

  GETCATEGORIAS():Observable<any>{
    return this.http.get(`${environment.hostname}/getcategorias`,this.HttpUploadOptions);
  }

  GETESTADOS():Observable<any>{
    return this.http.get(`${environment.hostname}/getestadospublicacion`,this.HttpUploadOptions);
  }

  getcategorias(){
    return this.categorias;
  }

  getcategoria(id:any){
    for(let categoria of this.categorias){
      if(categoria.id == id){
        return categoria.categoria
      }
    }
    return "not found"
  }

  getestados(){
    return this.estadosproducto
  }

  getunidades(){
    return this.unidades
  }

  getestadospublicacion(){
    return this.estadospublicacion
  }

  getactivepub(){
    let idactive = "";
    for(let estado of this.estadospublicacion){
      if(estado.estadopublicacion == "activa"){
        idactive = estado.id
      }
    }
    return idactive
  }
}
