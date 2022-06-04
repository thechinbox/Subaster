import { Comuna } from "./comuna";
import { Region } from "./region";

export interface Direccion{
    id:string;
    region:Region;
    comuna:Comuna;
    direccion:string;
    latitud:number;
    longitud:number;
}