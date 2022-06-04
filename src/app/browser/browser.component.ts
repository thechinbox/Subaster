import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../data/Services/menu-items.service';
import { MenuItems } from '../data/Interfaces/menu-items';
import { Publication } from '../data/Interfaces/publication';
import { PublicationService } from '../data/Services/publication.service';


@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  MenuItems : MenuItems[];
  publicaciones : Publication[];
  constructor( private _menuItemsService : MenuItemsService , private publicationService: PublicationService) {
    this.MenuItems = this._menuItemsService.obtenerItems();
    this.publicaciones = this._menuItemsService.obtenerPublicaciones();
   }

  ngOnInit(): void {
    this.obtenerPublicacion();
  }


  checkboxSelected(){
    /* Desarrollar funcion de filtro */
  }


  private async obtenerPublicacion(){
    let publication = this.publicationService.PUBLISH
  this.publicationService.getPost().subscribe(data => {
    console.log(data);
   })

  }

}
