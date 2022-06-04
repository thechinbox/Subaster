import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MenuItems } from '../Interfaces/menu-items';
import { Publication } from '../Interfaces/publication';
import { Categoria } from '../Interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  
  menuItems:Array<Categoria>;
  publicaciones:any;

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
  constructor(private http:HttpClient) {
    this. menuItems = new Array<Categoria>();
    this.GETCATEGORIAS().subscribe(data => {
      for(let i in data){
       this.menuItems.push({id:data[i]._id, categoria:data[i].categoria})
      }
    })  
  }

  GETCATEGORIAS():Observable<any>{
    return this.http.get(`${environment.hostname}/getcategorias`,this.HttpUploadOptions);
  }
  
  obtenerItems():Categoria[]{
    return this.menuItems
  }

   obtenerPublicaciones(): Publication[]{
     let publiciones : Publication [] = [{
       brand:'',
       date_e:'',
       date_i:'',
       diameter:'',
       id:0,
       lenght:'',
       material:'',
       model:'',
       observations:'',
       price:'',
       source:'',
       tittle:'',
       weight:'',
       image:''
     }]
     return publiciones;
   }

}
