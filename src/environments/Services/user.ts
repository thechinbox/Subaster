import { getMaxListeners } from "process";
import { user } from "../Interfaces/user";

/**
 * @returns Arreglo de usuarios de ejemplo
 */
function obtenerEjemplos(): Array<user> {
    
    let ejemplos: Array<user> = [
        {
            "idUser": 1,
            "name": "Fernando Espinoza",
            "email": "espinoza@gmail.com",
            "password": "hola123"
        },{
            "idUser": 2,
            "name": "Matias Rojas",
            "email": "rojas213@gmail.com",
            "password": "hola123"
        },{
            "idUser": 3,
            "name": "Martina López",
            "email": "marti123@gmail.com",
            "password": "hola123"
        },{
            "idUser": 4,
            "name": "Cristian Arredondo",
            "email": "arredondo14@gmail.com",
            "password": "hola123"
        },{
            "idUser": 5,
            "name": "Josefa Blanco",
            "email": "blancojose123@gmail.com",
            "password": "hola123"
        }
    ];

    return ejemplos;
}