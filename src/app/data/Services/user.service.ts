import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
 * @returns Arreglo de usuarios de ejemplo
 */
  obtenerEjemplos(): Array<User> {

    let ejemplos: Array<User> = [
        {
            "idUser": 1,
            "name": "Fernando Espinoza",
            "email": "espinoza@gmail.com",
            "password": "hola123",
            'image':''
        },{
            "idUser": 2,
            "name": "Matias Rojas",
            "email": "rojas213@gmail.com",
            "password": "hola123",
            'image':''
        },{
            "idUser": 3,
            "name": "Martina López",
            "email": "marti123@gmail.com",
            "password": "hola123",
            'image':''
        },{
            "idUser": 4,
            "name": "Cristian Arredondo",
            "email": "arredondo14@gmail.com",
            "password": "hola123",
            'image':''
        },{
            "idUser": 5,
            "name": "Josefa Blanco",
            "email": "blancojose123@gmail.com",
            "password": "hola123",
            'image':''
        }
    ];

    return ejemplos;
  }

  obtenerUsuario():User {
    let ejemplo: User = {
      "idUser": 1,
      "name": "Fernando Espinoza",
      "email": "espinoza@gmail.com",
      "password": "hola123",
      'image':'../../assets/user_coment.png'
    }
    return ejemplo;
  }
}
