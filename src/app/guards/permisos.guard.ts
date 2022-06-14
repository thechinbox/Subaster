import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isConstructorDeclaration } from 'typescript';
import { UserService } from '../data/Services/user.service';
import { StorageService } from '../data/Services/storage.service';
import { User } from 'back-end/Interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {

  constructor( private _userService:UserService, private _storageService:StorageService, private router:Router) {
   }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if(sessionStorage.getItem("id") == null){
        return true;
      }else{
        this.router.navigate(["home"]);
        return false;
      }
    }

}

