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
     }
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
       weight:''
     }]
     return publiciones;
   }

}
