import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Comuna } from '../Interfaces/comuna';
import { Region } from '../Interfaces/region';

@Injectable({
  providedIn: 'root'
})
export class ChileinfoService {
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
  
  regiones: Array<Region>

  constructor(private http:HttpClient) {
    this.regiones =  new Array<Region>();
    this.GETREGIONES().subscribe(data => {
      for(let i in data){
        let region = {id:data[i]._id, region:data[i].region, comunas:new Array<Comuna>()}
        this.GETCOMUNAS(region.id).subscribe(data2 =>{
          for(let j in data2){
            region.comunas.push({id:data2[j]._id, comuna:data2[j].comuna})
          }
        })
        this.regiones.push(region)
      }
    })
  }

  GETREGIONES():Observable<any>{
    return this.http.get(`${environment.hostname}/getregiones`,this.HttpUploadOptions);
  }

  GETCOMUNAS(idregion:any):Observable<any>{
    return this.http.get(`${environment.hostname}/getcomunas`+"?idregion="+idregion,this.HttpUploadOptions);
  }

  getregiones(){
    return this.regiones;
  }
  getcomunas(region:any):Array<Comuna>{
    let comunas = new Array();
    for(let i in this.regiones){
      if(region == this.regiones[i].region){
        comunas= this.regiones[i].comunas;
      }
    }
    return comunas;
  }
}
