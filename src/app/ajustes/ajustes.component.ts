import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  select:number;
  constructor() { 
    this.select = 0
  }

  ngOnInit(): void {
  }
  
  selected(n:any){
    this.select = n
  }
}
