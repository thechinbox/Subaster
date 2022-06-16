import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../data/Services/publication.service';
import { Publication } from '../data/Interfaces/publication';
import { Comment } from '../data/Interfaces/comment';
import { PublishComponent } from '../publish/publish.component';
import { Publish } from '../data/Interfaces/publish';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AttributesService } from '../data/Services/attributes.service';
import { ModalSwitchService } from '../data/Services/modal-switch.service';
import { ChileinfoService } from '../data/Services/chileinfo.service';
import { UserService } from '../data/Services/user.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {
  //seteados por defecto
  publication: Publish;
  aux : any;
  modalSwitch: boolean = false;
  comentarios:Comment[];
  imagenSwitch: boolean = false;
  url:any
  constructor(private _publication: PublicationService, private router:Router, 
              private activatedRoute:ActivatedRoute, private attributes:AttributesService,
              private _switchPujar: ModalSwitchService, private chileinfo:ChileinfoService,
              private usuario:UserService) {
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
    this.comentarios = this._publication.obtenerComentarios();
    this._switchPujar.getPublicacionPujarSwitch().subscribe(valor => this.modalSwitch = valor)
    this._switchPujar.getImagenSwitch().subscribe(valor => {
      if(!valor){
        let d :any = document.getElementById("pre-blur")
        d.classList.remove("blur")
      }
      this.imagenSwitch = valor
    })
  }

  ngOnInit(): void {
    this._publication.GETPUBLICATION(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(async (data) => {
      try{
        this.publication = await data;
        this.publication.estadoproducto = await this.attributes.getestado(data.estadoproducto)
        this.publication.unidad = await this.attributes.getunidad(data.unidad)
        this.publication.categoria = await this.attributes.getcategoria(data.categoria)
        await this._publication.GETDIRECTION(this.publication.id).subscribe(data => {
          this.publication.direccion = data
          let region = this.chileinfo.getregion(this.publication.direccion.region)   
          let comuna = this.chileinfo.getcomuna(this.publication.direccion.region,this.publication.direccion.comuna)
          this.publication.direccion.region = region    
          this.publication.direccion.comuna = comuna
        })
        this._publication.GETMEDIA(this.publication.id).subscribe(data =>{
          this.publication.url = data
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
   
  verImagen(url:any){
    let d:any = document.getElementById("pre-blur")
    d.classList.add("blur")
    this.url = url
    this._switchPujar.SetVerImagen(true)
  }
  comprar(){
    this.usuario.addProduct(this.publication.id).then(() =>{
      this._switchPujar.SetPublicacionPujarSwitch(true);
    })
  }

  unblur(){
    let d:any = document.getElementById("pre-blur")
    d.classList.add("unblur")
  }
}
