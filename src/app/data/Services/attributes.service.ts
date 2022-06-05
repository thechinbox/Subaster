import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Categoria } from '../Interfaces/categoria';
import { Estadoproducto } from '../Interfaces/estadoproducto';
import { Unidad } from '../Interfaces/unidad';

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
  categorias:Array<Categoria>;

  constructor(private http:HttpClient) {
    this.unidades = new Array<Unidad>();
    this.estadosproducto = new Array<Estadoproducto>();
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

  getcategorias(){
    return this.categorias;
  }

  getestados(){
    return this.estadosproducto
  }

  getunidades(){
    return this.unidades
  }
}
