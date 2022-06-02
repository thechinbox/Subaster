import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../data/Services/publication.service';
import { Publication } from '../data/Interfaces/publication';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {
  
  publication:Publication;

  constructor(private _publication: PublicationService) {
    this.publication = this._publication.obtenerEjemplos();
  }

  ngOnInit(): void {
    this.publication.price = this.insertarPuntos(this.publication.price);
  }

  /**
   * Devuelve un 'string' en formato de moneda.
   */
  insertarPuntos(valor:string): string{
    var numero = +valor;
    return new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(numero);
  }
}
