import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../data/Interfaces/user';
import { UserService } from '../data/Services/user.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usuario:User;
  profileInformation:FormGroup;

  constructor(private _user:UserService) {
    this.usuario = this._user.getUser();
    this.profileInformation = new FormGroup({
      nombres : new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]),
      apellidos : new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]),
      correo : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      direccion : new FormControl('', [
        Validators.required
      ]),
      celular : new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9] + '),
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
    })
  }


  resetForm(){
    this.profileInformation.reset();
  }

  ngOnInit(): void {
    this._user.getEmiter().subscribe( data => {
      this.usuario = this._user.getUser()
    })

    //llamar función para limpiar el formulario sin enviar
    this.resetForm();
  }

}
