import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../data/Services/menu-items.service';
import { MenuItems } from '../data/Interfaces/menu-items';
import { Publication } from '../data/Interfaces/publication';
import { PublicationService } from '../data/Services/publication.service';
import { Categoria } from '../data/Interfaces/categoria';
import { BrowseService } from '../data/Services/browse.service';
import { Publish } from '../data/Interfaces/publish';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  MenuItems : Array<Categoria>;
  publicaciones : Array<Publish>;
  currentRoute: string
  constructor( private _menuItemsService : MenuItemsService , private router: Router ,private browse:BrowseService) {
    this.currentRoute= "";
    this.MenuItems = this._menuItemsService.obtenerItems();
    this.publicaciones = [];
    
   }

  ngOnInit(): void {
    this.browse.GETPUBLICATIONS().subscribe(data =>{
      this.publicaciones = data;
      for(let publicacion of this.publicaciones){
        this.browse.GETDIRECTION(publicacion.direccion.id).subscribe(data2 =>{
          publicacion.direccion= data2;
        })
      }    
    })
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if(event.url.includes("/browser") && event.urlAfterRedirects.includes("/browser")){
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
    })
  }
  checkboxSelected(){
    /* Desarrollar funcion de filtro */
  }
}

