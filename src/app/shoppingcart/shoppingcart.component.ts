import { Component, OnInit } from '@angular/core';
import { Publish } from '../data/Interfaces/publish';
import { AttributesService } from '../data/Services/attributes.service';
import { ChileinfoService } from '../data/Services/chileinfo.service';
import { PublicationService } from '../data/Services/publication.service';
import { UserService } from '../data/Services/user.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  preview:Array<Publish>
  compras:Array<Publish>
  constructor(private user:UserService, private _publication:PublicationService, 
      private attributes:AttributesService, private chileinfo:ChileinfoService) {
    this.preview = new Array();
    this.compras = new Array();
    try{
      let aux:any = sessionStorage.getItem("products")
      console.log(JSON.parse(aux));
      
      for(let id of JSON.parse(aux).ids ){
        console.log(id);
        this._publication.GETPUBLICATION(id).subscribe(async (data) => {
          let publication = await data;
            publication.estadoproducto = await this.attributes.getestado(data.estadoproducto)
            publication.unidad = await this.attributes.getunidad(data.unidad)
            publication.categoria = await this.attributes.getcategoria(data.categoria)
            await this._publication.GETDIRECTION(publication.id).subscribe(data => {
              publication.direccion = data
              let region = this.chileinfo.getregion(publication.direccion.region)   
              let comuna = this.chileinfo.getcomuna(publication.direccion.region,publication.direccion.comuna)
              publication.direccion.direccion = publication.direccion.direccion.charAt(0).toUpperCase() + publication.direccion.direccion.slice(1);   
              publication.direccion.region = region.charAt(0).toUpperCase() + region.slice(1);   
              publication.direccion.comuna = comuna.charAt(0).toUpperCase() + comuna.slice(1).toLowerCase()
            })
            await this._publication.GETMEDIA(publication.id).subscribe(data =>{
              publication.url = data
            })
            this.preview.push(publication)
        })
      }
    }catch(err){
      console.log(err);
    }
   }

  ngOnInit(): void {
    console.log(this.preview);
    
  }

}
