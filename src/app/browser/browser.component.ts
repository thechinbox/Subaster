import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../data/Services/menu-items.service';
import { MenuItems } from '../data/Interfaces/menu-items';
import { Publication } from '../data/Interfaces/publication';
import { PublicationService } from '../data/Services/publication.service';
import { Categoria } from '../data/Interfaces/categoria';
import { BrowseService } from '../data/Services/browse.service';
import { Publish } from '../data/Interfaces/publish';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AttributesService } from '../data/Services/attributes.service';


@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  categorias : Array<Categoria>;
  publicaciones : Array<Publish>;
  currentRoute: string;
  seleccionadas:Array<string>;
  constructor( private attrb : AttributesService , private router: Router ,private browse:BrowseService) {
    this.currentRoute= "";
    this.categorias = this.attrb.getcategorias()
    this.publicaciones = [];
    this.seleccionadas = this.browse.getSeleccionadas();
    
   }

  ngOnInit(): void {
    this.browse.GETPUBLICATIONS().subscribe(data =>{
      this.publicaciones = data;
      for(let publicacion of this.publicaciones){
        this.browse.GETDIRECTION(publicacion.direccion.id).subscribe(data2 =>{
          publicacion.direccion= data2;
        })
        this.browse.GETMEDIA(publicacion.id).subscribe(data3 =>{
          publicacion.url= data3;

        })
      }    
    })
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if(event.url.includes("/browser") && event.urlAfterRedirects.includes("/browser")){
            this.seleccionadas = this.browse.getSeleccionadas();
            this.updatePulications()
          }
        }
    });
  }

  async updatePulications(){
    this.browse.GETPUBLICATIONS().subscribe(data =>{
      this.publicaciones = data;
      for(let publicacion of this.publicaciones){
        this.browse.GETDIRECTION(publicacion.direccion.id).subscribe(data2 =>{
          publicacion.direccion= data2;
        })
      }
      console.log(this.publicaciones);
          
    })
  }

  async checkChecked(e:any){
    let deleted = false;
    for(let i in this.seleccionadas){
      if(this.seleccionadas[i] == e){
        delete this.seleccionadas[i]
        this.seleccionadas = this.seleccionadas.filter(function (el) {
          return el != null;
        });
        deleted = true;
        break
      }
    }
    if(!deleted){
      this.seleccionadas.push(e)
      this.browse.setFilter(this.seleccionadas).then(()=>{
        this.updatePulications()
      })
    }else{
      this.browse.setFilter(this.seleccionadas).then(()=>{
        this.updatePulications()
      })
    }
  }

}

