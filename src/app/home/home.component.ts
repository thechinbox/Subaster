import { Component, OnInit } from '@angular/core';
import {PublicationService} from '../data/Services/publication.service';
import { Publish } from '../data/Interfaces/publish';
import { MediaContent } from 'back-end/Interfaces/media-content';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Direction } from 'readline';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lista : Array<Publish>
  imgPublicaciones : Array<MediaContent>;
  constructor(private _publicationService:PublicationService) {
    this.lista = new Array;
    this.imgPublicaciones = new Array;
  }

  homePublications(){
   this._publicationService.getPost().subscribe(data => {
      this.lista = data;
      this.imgPublicaciones = data.url;
      console.log(this.imgPublicaciones)
    })
  }

  ngOnInit(): void {
    this.homePublications();
  }

  getheight(){
    return screen.height/2;
  }
}
