import { Subasta } from "./subasta";
import { User } from "./user";

export interface Puja{
    id:string;
    idpublicacion:Subasta["id"];
    idusuario:User["id"];
    valorpuja:number;
    fechapuja:Date;
}