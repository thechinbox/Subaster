import { Component, OnInit } from '@angular/core';
import {PublicationService} from '../data/Services/publication.service';
import { Publish } from '../data/Interfaces/publish';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lista : Array<Publish>

  constructor(private _publicationService:PublicationService) {
    this.lista = new Array;
  }

  homePublications(){
   this._publicationService.getPost().subscribe(data => {
      this.lista = data;
      console.log(this.lista);
    })
  }

  ngOnInit(): void {
    this.homePublications();
  }

  getheight(){
    return screen.height/2;
  }
}
