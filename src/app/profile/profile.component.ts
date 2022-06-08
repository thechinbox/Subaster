import { Component, OnInit } from '@angular/core';
import { User } from '../data/Interfaces/user';
import { UserService } from '../data/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usuario:User;

  constructor(private _user:UserService) {
    this.usuario = this._user.obtenerUsuario();
  }

  ngOnInit(): void {
  }

}
