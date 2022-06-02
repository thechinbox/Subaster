import { Injectable } from '@angular/core';
import { Publication } from '../Interfaces/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor() {}

  /**
  * @returns Arreglo de usuarios de ejemplo
  */
  obtenerEjemplos(): Publication {
      
    let ejemplo: Publication = {
      id: 0,
      tittle: "TUBOS pvc lote 500",
      price: "500000",
      date_i: "10/09/2022",
      date_e: "10/12/2022",
      material: "PVC",
      brand: "Genérico",
      model: "Genérico",
      lenght: "1m",
      diameter: "110mm",
      weight: "",
      source: "",
      observations: ""
    }

    return ejemplo;
  }
}
