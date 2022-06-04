import { Categoria } from "./categoria";
import { Estadoproducto } from "./estadoproducto";
import { Unidad } from "./unidad";
import { Tipoventa } from "./tipoventa";
import { Direccion } from "./direccion";
import { MediaContent } from "./media-content";

export interface Publish {
    id:string;
    nombre:string;
    descripcion:string;
    categoria:Categoria;
    unidad:Unidad;
    estadoproducto:Estadoproducto;
    fechapublicacion:Date;
    tipoventa:Tipoventa;
    direccion:Direccion;
    url?:Array<MediaContent>
}
