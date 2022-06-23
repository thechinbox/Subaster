import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
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
  total:any;
  comprar = false;
  cargando = false;
  subido = false;
  info=true;
  login=false
  cantidades = new Array()
  constructor(private user:UserService, private _publication:PublicationService, 
      private attributes:AttributesService, private chileinfo:ChileinfoService,
      private router:Router) {
      this.total = 0
    this.preview = new Array();
    console.log(sessionStorage.getItem("id"));   
    try{
      let aux:any = sessionStorage.getItem("products")
      console.log(JSON.parse(aux).ids);
      for(let id of JSON.parse(aux).ids ){
        let aux = id.split("&cantidad=")[1]
        this.cantidades.push(aux);
        this._publication.GETPUBLICATION(id).subscribe(async (data) => {
          let publication = await data;
            publication.estadoproducto = await this.attributes.getestado(data.estadoproducto)
            publication.unidad = await this.attributes.getunidad(data.unidad)
            publication.categoria = await this.attributes.getcategoria(data.categoria)
            this.total = this.total + publication.precio * aux;
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
            this.comprar = true
        })
      }
      console.log(this.cantidades);
      
    }catch(err){
      console.log(err);
    }
   }

  ngOnInit(): void {    

  }
  changeQ(id:any, event:any){
    console.log(event.target.value);
    for(let i in this.preview){
      if(this.preview[i].id == id){
        //this.total = this.total - ((this.preview[i].precio as number) * event.target.value)
        console.log(this.preview[i]);
        
      }
    }
  }

  eliminarCarrito(id:any){
    for(let i in this.preview){
      if(this.preview[i].id == id){
        this.total = this.total - (this.preview[i].precio as number)
        delete this.preview[i]
        delete this.cantidades[i]
        this.preview = this.preview.filter(function (el) {
          return el != null;
        });
        this.cantidades = this.cantidades.filter(function (el) {
          return el != null;
        });
        break;
      }
    }
    console.log(this.preview);
    
    if(this.preview.length == 0){
      this.comprar = false;
    }
    let aux = Array<String>();
    for(let i in this.preview){
      console.log(this.preview[i].id+"&cantidad="+this.cantidades[i]);
      
      aux.push(this.preview[i].id+"&cantidad="+this.cantidades[i])
    }
    console.log(aux);
    sessionStorage.removeItem("products")
    sessionStorage.setItem("products", JSON.stringify({ids:aux}))
  }

  finalizarCompra(){
    if(sessionStorage.getItem("id") != null && sessionStorage.getItem("id") != undefined ){
      this.cargando = true;
      this.info = false;
      this.user.BUY(this.preview, this.cantidades).subscribe(data => {
        this.cargando = false;
        this.subido = true;
        setTimeout(() => {
          sessionStorage.removeItem("products")
          sessionStorage.setItem("products", JSON.stringify({ids:new Array()}))
          this.user.resetProducts()
          this.subido = false;
          this.router.navigateByUrl("/home")
        }, 5000); 
      })
    }else{
      this.login = true;
      setTimeout(() => {
        this.login = false;
        this.router.navigateByUrl("/login")
      }, 5000); 
    }
  }
}
