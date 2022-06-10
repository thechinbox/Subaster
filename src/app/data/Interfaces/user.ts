import { Direccion } from "./direccion";

export interface User {
    id: string;
    nombre: string;
    apellidos: string;
    direccion: Direccion;
    correo: string;
    celular: number;
    contrasena: string;
    fechacreacion:Date;
}
