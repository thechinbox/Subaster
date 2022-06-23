import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  @Output() selected:EventEmitter<any> = new EventEmitter();
  isCollapsedA =false;

  constructor() {
   }

  ngOnInit(): void {
  }

  seleccionar(n:any){
    this.selected.emit(n)
  }
}
