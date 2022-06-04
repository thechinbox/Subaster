import { Injectable } from '@angular/core';
import { MenuItems } from '../Interfaces/menu-items';
import { Publication } from '../Interfaces/publication';
import { PublicationService } from './publication.service';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  menuItems:any;
  publicaciones:any;

  constructor() {
   }

   obtenerItems(): MenuItems[]{
     let menuItems : MenuItems [] = [{
       _id : '6296d8fbc30c38f000160514',
       categoria : 'Aceros y elementos metálicos',
     },
     {
       _id: '6296d98fc30c38f000160519',
       categoria: 'Electricidad'
     },
     {
       _id:'6296d9a9c30c38f00016051b',
       categoria:'Artefactos sanitarios y gasfitería'
     },
     {
      _id:'6296d9e9c30c38f00016051c',
      categoria:'Revestimientos y estucos'
     },
     {
      _id:'6296da0dc30c38f00016051d',
      categoria:'Maderas y muebles'
     },
     {
      _id:'6296da17c30c38f00016051e',
      categoria:'Equipos y herramientas'
     },
     {
      _id:'6296da52c30c38f000160521',
      categoria:'Pinturas y accesorios'
     },
     {
      _id:'6296da5bc30c38f000160522',
      categoria:'Cerámicos y adhesivos'
     },
     {
      _id:'6296da66c30c38f000160523',
      categoria:'Puertas y ventanas'
     },
     {
      _id:'6296da70c30c38f000160524',
      categoria:'Residuos peligrosos'
     },
     {
      _id:'6296da77c30c38f000160525',
      categoria:'Seguridad'
     },
    ]
    return menuItems;
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
