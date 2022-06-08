import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Categoria } from 'back-end/Interfaces/categoria';
import { AttributesService } from '../data/Services/attributes.service';
import { BrowseService } from '../data/Services/browse.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  lista:Categoria[];

  constructor(private atributos:AttributesService, private browse:BrowseService, private router:Router) {
    this.lista = atributos.getcategorias()
  }

  ngOnInit(): void {
  }

  async filtrar(categoria:Categoria){
    let filtro = "?categoria="+categoria.id
    await this.browse.setFilter(filtro)
    this.router.navigateByUrl('/browser?categoria='+this.atributos.getcategoria(categoria.id))
  }

}
