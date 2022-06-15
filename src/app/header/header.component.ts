import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'back-end/Interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isCollapsed=true;
  isCollapsed2=true;
  flag:number;
  user:User;
  constructor(private _userService:UserService, private router:Router) {
    this.flag= 0;
    this.user = this._userService.getUser()
    if(sessionStorage.getItem("id") || localStorage.getItem("id")){
      this.flag = 1;
      this.user = this._userService.getUser()
    }
   }

  ngOnInit(): void {
    this._userService.getEmiter().subscribe( data => {
      this.user = this._userService.getUser()
      this.flag = 1;
    })
    
  }

  logout(){
    if(sessionStorage.getItem("id")){
      sessionStorage.removeItem("id")
    }else{
      localStorage.removeItem("id")
    }
    this.router.navigateByUrl("/home").then(()=>{
      window.location.reload();
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
