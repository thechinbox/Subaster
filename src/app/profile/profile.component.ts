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
  edit:boolean;
  ids = ["nombre", "apellidos", "correo" , "direccion.direccion", "celular"]
  editObject:any = {};
  editando:any = []
  constructor(private _user:UserService) {
    this.edit = false;
    this.usuario = this._user.getUser();
    this.profileInformation = new FormGroup({
      nombre : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      apellidos : new FormControl('', [
        Validators.required,
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
    if(sessionStorage.getItem("id") != null){
      this._user.getEmiter().subscribe( data => {
        this.usuario = this._user.getUser()
      })
      for(let id of this.ids){
        let aux:any = document.getElementById(id);
        aux.disabled = true;
      }
      setTimeout(() => {
        let aux:any = document.getElementById('nombre');
        if(aux.value == ""){
          for(let id of this.ids){
            let aux:any = document.getElementById(id);
            aux.value = eval("this.usuario."+id)
          }
        }
      }, 500);
    }

    //llamar función para limpiar el formulario sin enviar
    this.resetForm();
  }
  editar(property:any){
    let aux:any = document.getElementById(property)
    aux.disabled = false;
    this.editObject[property] = property
    this.editando.push(property)
  }
  removeEdit(property:any){
    this.profileInformation?.get(property)?.setErrors(null) 
    let aux:any = document.getElementById(property)
    aux.disabled = true;
    aux.value = eval("this.usuario."+ property)
    delete this.editObject[property]
    for (let index = 0; index < this.editando.length; index++) {
      if(this.editando[index] == property){
        delete this.editando[index]
        this.editando = this.editando.filter(function (el:any) {
          return el != null;
        });
      }
    }
  }
}
