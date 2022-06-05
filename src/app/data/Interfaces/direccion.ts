import { Comuna } from "./comuna";
import { Region } from "./region";

export interface Direccion{
    region:Region;
    comuna:Comuna;
    direccion:string;
    latitud:number;
    longitud:number;
}