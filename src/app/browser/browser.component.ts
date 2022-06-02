import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../data/Services/menu-items.service';
import { MenuItems } from '../data/Interfaces/menu-items';
import { PublicationService } from '../data/Services/publication.service';
import { Publication } from '../data/Interfaces/publication';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  MenuItems : MenuItems[];
  publicaciones : Publication[];
  constructor( private _menuItemsService : MenuItemsService) {
    this.MenuItems = this._menuItemsService.obtenerItems();
    this.publicaciones = this._menuItemsService.obtenerPublicaciones();
   }

  ngOnInit(): void {
  }

}
