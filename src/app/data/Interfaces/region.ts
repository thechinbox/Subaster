import { Comuna } from "./comuna";

export interface Region{
    id:string;
    region:string;
    comunas:Array<Comuna>;
}