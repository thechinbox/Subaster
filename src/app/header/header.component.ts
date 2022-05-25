import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed=true;
  isCollapsed2=true;
  constructor() { }

  ngOnInit(): void {
  }

  mouseleave(){
    setTimeout(() => {
      if(this.isCollapsed2){
        this.isCollapsed = true;
      }  
    }
    , 200);
  }
  mouseleave2(){
    this.isCollapsed2 = true;
    this.isCollapsed = true;
  } 
}
