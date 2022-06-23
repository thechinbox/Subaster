import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publish } from 'src/app/data/Interfaces/publish';
import { BrowseService } from 'src/app/data/Services/browse.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  publicaciones:Array<Publish>

  constructor(private router:Router, private browser:BrowseService) {
    this.publicaciones = new Array()
    console.log(this.router.url.split("?busqueda=")[1]);
    
    this.browser.SEARCHPUBLICATIONS(this.router.url.split("?busqueda=")[1]).subscribe(data =>{
      this.publicaciones = data
      console.log(data);
      for(let p of this.publicaciones){
        this.browser.GETMEDIA(p.id).subscribe(data =>{
          p.url = data
        })
      }      
    })
  }

  ngOnInit(): void {
  }

  setId(id:any){
    console.log((id));
    this.router.navigateByUrl('/publicacion/'+id);
  }

}
