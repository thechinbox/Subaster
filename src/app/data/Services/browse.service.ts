import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publish } from 'back-end/Interfaces/publish';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Direccion } from '../Interfaces/direccion';
@Injectable({
  providedIn: 'root'
})
export class BrowseService {
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
  
  filter:any;
  publicaciones:Array<Publish>;
  idseleccionadas:any[]

  constructor(private http:HttpClient) {
    this.publicaciones = new Array();
    this.idseleccionadas = new Array();
    this.filter = ""
  }

  GETPUBLICATIONS():Observable<any>{
    console.log(this.filter);
    return this.http.get(`${environment.hostname}/getpublicaciones`+this.filter,this.HttpUploadOptions);
  }
  GETDIRECTION(id:any):Observable<any>{
    return this.http.get(`${environment.hostname}/getdireccion?id=`+id,this.HttpUploadOptions);
  }

  async setFilter(ids:any){
    try{
      this.filter = "?categoria=";
      for(let i = 0; i<ids.length; i++){
        if(i == ids.length - 1 ){
          this.filter = this.filter  + ids[i]  
        }else{
          this.filter = this.filter + ids[i]  + ","
        }
      }
    }catch(err:any){
      console.log(err);
      
    }
  }
}
