import { Comuna } from "./comuna";
import { Region } from "./region";

export interface Direccion{
    id:String;
    region:Region["id"];
    comuna:Comuna["id"];
    direccion:String;
    latitud:number;
    longitud:number;
}