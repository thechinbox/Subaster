import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Categoria } from 'back-end/Interfaces/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit, AfterViewInit {
  @Input() seleccionadas:Array<string>;
  @Input() categorias:any;
  @Output() checkChecked:EventEmitter<any> = new EventEmitter();

  constructor(private router:Router) {
    this.seleccionadas = []
   }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    for(let select of this.seleccionadas){
      console.log(select);
      let change:any = document.getElementById(select)
      console.log(change);
      change.checked = true;
    }
    
  }

  check(item:Categoria){
    this.checkChecked.emit(item.id)
  }

}
