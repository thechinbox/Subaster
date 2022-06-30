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
import { Subasta } from '../data/Interfaces/subasta';


@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  categorias : Array<Categoria>;
  publicaciones : Array<Publish>;
  subastas: Array<Subasta>;
  currentRoute: string;
  seleccionadas:Array<string>;
  constructor( private attrb : AttributesService , private router: Router ,private browse:BrowseService) {
    let ids = router.url.split("=")[1]
    if(ids.includes("%20")){
      this.browse.setFilter(ids.split("%20"))
    }else{
      this.browse.setFilter([ids])
    }
    this.currentRoute= "";
    this.categorias = this.attrb.getcategorias()
    this.publicaciones = [];
    this.subastas = []
    this.seleccionadas = this.browse.getSeleccionadas();
    
   }

  ngOnInit(): void {
    this.browse.GETPUBLICATIONS().subscribe(data =>{
      this.publicaciones = data;
      for(let publicacion of this.publicaciones){
        this.browse.GETDIRECTION(publicacion.id).subscribe(data2 =>{
          publicacion.direccion= data2;
          this.browse.GETMEDIA(publicacion.id).subscribe(data3 =>{
            publicacion.url= data3;
          })
        })
      }    
    })
    this.browse.GETAUCTIONS().subscribe(data =>{
      this.subastas = data  
      for(let subasta of this.subastas){
        this.browse.GETDIRECTION(subasta.id).subscribe(data2 =>{
          subasta.direccion= data2;
          this.browse.GETMEDIA(subasta.id).subscribe(data3 =>{
            subasta.url= data3;
          })
        })
      }     
    })
  }

  updatePulications(){
    this.browse.GETPUBLICATIONS().subscribe(data =>{
      this.publicaciones = data;
      for(let publicacion of this.publicaciones){
        this.browse.GETDIRECTION(publicacion.id).subscribe(data2 =>{
          publicacion.direccion= data2;
          this.browse.GETMEDIA(publicacion.id).subscribe(data3 =>{
            publicacion.url= data3;
            console.log(publicacion);
            
          })
        })
      }   
    })
    this.browse.GETAUCTIONS().subscribe(data =>{
      this.subastas = data  
      for(let subasta of this.subastas){
        this.browse.GETDIRECTION(subasta.id).subscribe(data2 =>{
          subasta.direccion= data2;
          this.browse.GETMEDIA(subasta.id).subscribe(data3 =>{
            subasta.url= data3;
          })
        })
      }     
    })
  }

  checkChecked(e:any){
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
        let url = ""
        for (let index = 0; index < this.seleccionadas.length; index++) {
          if(index == 0){
            url = this.seleccionadas[index];
          }else{
            url = url + "+" + this.seleccionadas[index];
          }
        }
        this.router.navigateByUrl("/browser?categoria="+url)
        this.updatePulications()
      })
    }else{
      let url = ""
      for (let index = 0; index < this.seleccionadas.length; index++) {
        if(index == 0){
          url = this.seleccionadas[index];
        }else{
          url = url + "+" + this.seleccionadas[index];
        }
      }
      this.router.navigateByUrl("/browser?categoria="+url) 
      this.browse.setFilter(this.seleccionadas).then(()=>{
        this.updatePulications()
      })
    }
    
  }

  setId(id:any){
    console.log((id));
    this.router.navigateByUrl('/publicacion/'+id);
  }
  setIdSubasta(id:any){
    this.router.navigateByUrl('subasta/'+id);
  }


}

