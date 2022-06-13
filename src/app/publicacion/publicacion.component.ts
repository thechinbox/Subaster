import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../data/Services/publication.service';
import { Publication } from '../data/Interfaces/publication';
import { Comment } from '../data/Interfaces/comment';
import { PublishComponent } from '../publish/publish.component';
import { Publish } from '../data/Interfaces/publish';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AttributesService } from '../data/Services/attributes.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {
  //seteados por defecto
  publication: Publish;
  aux : any;



  constructor(private _publication: PublicationService, private router:Router, private activatedRoute:ActivatedRoute, private attributes:AttributesService) {
    this.publication = {
      id: '',
      nombre:'',
      descripcion:'',
      categoria:'',
      unidad:'',
      estadopublicacion:'',
      estadoproducto:'',
      fechapublicacion: new Date,
      precio:0,
      cantidad:0,
      direccion:{
          id:'',
          region:" ",
          comuna:" ",
          direccion: '',
              latitud:0,
              longitud:0
      },
      url:new Array()
    }
  }

  ngOnInit(): void {
    this._publication.GETPUBLICATION(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(async (data) => {
      try{
        this.publication = await data;
        console.log(this.publication);
        this.publication.estadoproducto = await this.attributes.getestado(data.estadoproducto)
        this.publication.unidad = await this.attributes.getunidad(data.unidad)
        this.publication.categoria = await this.attributes.getcategoria(data.categoria)

        this._publication.GETDIRECTION(this.publication.id).subscribe(data => {
          this.publication.direccion = data
        })
      }catch(err){
        console.log('error');

      }
    })
    /* this.publication = this.aux; */
  }

  /**
   * Devuelve un 'string' en formato de moneda.
   */
  insertarPuntos(valor:string): string{
    var numero = +valor;
    return new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(numero);
  }
}
