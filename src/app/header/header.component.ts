import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isCollapsed=true;
  isCollapsed2=true;
  flag:number;

  constructor(private _userService:UserService, private router:Router) {
    this.flag= 0;
    if(sessionStorage.getItem("id") || localStorage.getItem("id")){
      this.flag = 1;
    }
   }

  ngOnInit(): void {
    this._userService.getEmiter().subscribe( data => {
      this.flag = 1;
    })
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
