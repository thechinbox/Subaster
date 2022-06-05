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
    this.publicaciones = browse.getpublications()
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.split("?")[0];
        let after = event.urlAfterRedirects.split("?");
        if(this.currentRoute.includes("/browse")){
          console.log("?"+after[1]);
          this.browse.setpublications("?"+after[1]).then(()=>{
            this.publicaciones = browse.getpublications()
            console.log(this.publicaciones);
            
          })          
        }
      }
  });
   }

  ngOnInit(): void {

  }


  checkboxSelected(){
    /* Desarrollar funcion de filtro */
  }
}

