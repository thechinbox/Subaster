import { Component, OnInit } from '@angular/core';
import {PublicationService} from '../data/Services/publication.service';
import { Publish } from '../data/Interfaces/publish';
import { MediaContent } from 'back-end/Interfaces/media-content';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Direction } from 'readline';
import { BrowseService } from '../data/Services/browse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lista : Array<Publish>
  constructor(private _publicationService:PublicationService, private browse:BrowseService) {
    this.lista = new Array;
  }

  homePublications(){
   this._publicationService.getPost().subscribe(data => {
      this.lista = data;
      for(let publicacion of this.lista){
        this.browse.GETDIRECTION(publicacion.direccion.id).subscribe(data2 =>{
          publicacion.direccion= data2;
          this.browse.GETMEDIA(publicacion.id).subscribe(data3 =>{
            publicacion.url= data3;
            console.log(publicacion);
            
          })
        })
      }
    })
  }

  ngOnInit(): void {
    this.homePublications();
  } 

  getheight(){
    return screen.height/2;
  }
}
