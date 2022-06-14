import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Categoria } from 'back-end/Interfaces/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  @Input() seleccionadas:Array<string>;
  @Input() categorias:any;
  @Output() checkChecked:EventEmitter<any> = new EventEmitter();

  constructor(private router:Router) {
    this.seleccionadas = []
   }

  ngOnInit(): void {

  }

  check(item:Categoria){
    this.checkChecked.emit(item.id)
  }

}
