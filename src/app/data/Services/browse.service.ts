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
  
  publicaciones:Array<Publish>;
  constructor(private http:HttpClient) {
    this.publicaciones = new Array();
  }

  GETPUBLICATIONS(filters:any):Observable<any>{
    return this.http.get(`${environment.hostname}/getpublicaciones`+filters,this.HttpUploadOptions);
  }
  GETDIRECTION(id:any):Observable<any>{
    return this.http.get(`${environment.hostname}/getdireccion?id=`+id,this.HttpUploadOptions);
  }

  async setpublications(filters:any){
    this.GETPUBLICATIONS(filters).subscribe(data =>{
      this.publicaciones = data;
    })
    for(let publicacion of this.publicaciones){
      this.GETDIRECTION(publicacion.direccion.id).subscribe(data2 =>{
        publicacion.direccion= data2;
      })
    }    
  }

  getpublications():Array<Publish>{
    return this.publicaciones
  }
}
