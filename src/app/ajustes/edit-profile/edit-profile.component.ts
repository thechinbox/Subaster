import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Region } from 'back-end/Interfaces/region';
import { Comuna } from 'src/app/data/Interfaces/comuna';
import { User } from 'src/app/data/Interfaces/user';
import { ChileinfoService } from 'src/app/data/Services/chileinfo.service';
import { UserService } from 'src/app/data/Services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  usuario:User;
  profileInformation:FormGroup;
  edit:boolean;
  ids = ["nombre", "apellidos", "correo" , "direccion.direccion", "celular"]
  editObject:any = {};
  editando:any = []
  regiones:Array<Region>
  diredit = false;
  chardata = true;
  constructor(private _user:UserService, private chile:ChileinfoService) {
    this.edit = false;
    this.regiones = this.chile.getregiones()
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
        Validators.pattern("^[0-9]{9}")
      ])
    })
  }


  resetForm(){
    this.profileInformation.reset();
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("id") != null){
      console.log("yep");
      
      this._user.getEmiter().subscribe(  data => {
        console.log("yep2");
        
        this.usuario = this._user.getUser()
        let r:any = document.getElementById(this.usuario.direccion.region)
        r.selected = true;
        let select:any = document.getElementById("comuna");
        while (select.firstChild) {
          select.removeChild(select.firstChild);        
        }
        let a = 6000
        let comunas:Array<Comuna> =  new Array()
        comunas = this.chile.getcomunas(r.value);
        if(comunas.length == 0){
          console.log("yep3");
          this.chile.GETCOMUNAS(this.usuario.direccion.region).subscribe( data =>{
            comunas = data
            this.diredit = false;
            for (let index = 0; index < comunas.length; index++) {
              if(comunas[index].id == this.usuario.direccion.comuna){
                let  nuevaopcion = new Option(comunas[index].comuna, comunas[index].comuna, false,true);
                select?.appendChild(nuevaopcion)
                continue          }
              let  nuevaopcion = new Option(comunas[index].comuna, comunas[index].comuna, false,false);
              select?.appendChild(nuevaopcion)        
            }
            for(let id of this.ids){
              if(id == "direccion.direccion"){
                this.profileInformation.controls["direccion"].setValue(this.usuario.direccion.direccion) 
              }else{
                this.profileInformation.controls[id].setValue(eval("this.usuario."+id)) 
              }
            }
            this.chardata=false;
          })
        }else{
          for (let index = 0; index < comunas.length; index++) {
            if(comunas[index].id == this.usuario.direccion.comuna){
              let  nuevaopcion = new Option(comunas[index].comuna, comunas[index].comuna, false,true);
              select?.appendChild(nuevaopcion)
              continue          }
            let  nuevaopcion = new Option(comunas[index].comuna, comunas[index].comuna, false,false);
            select?.appendChild(nuevaopcion)        
          }
          for(let id of this.ids){
            if(id == "direccion.direccion"){
              this.profileInformation.controls["direccion"].setValue(this.usuario.direccion.direccion) 
            }else{
              this.profileInformation.controls[id].setValue(eval("this.usuario."+id)) 
            }
          }
          this.diredit = false;
          this.chardata=false;
        }        
      })
      for(let id of this.ids){
        let aux:any = document.getElementById(id);
        aux.disabled = true;
      }
      setTimeout(() => {
        
        let aux:any = document.getElementById('nombre');
        if(aux.value == ""){
          console.log("yep3");
        
          let r:any = document.getElementById(this.usuario.direccion.region)
          r.selected = true;
          let select:any = document.getElementById("comuna");
          while (select.firstChild) {
            select.removeChild(select.firstChild);
          }
          let comunas:Array<Comuna> = this.chile.getcomunas(r.value);
          console.log(comunas);
          
          for (let index = 0; index < comunas.length; index++) {
            if(comunas[index].id == this.usuario.direccion.comuna){
              let  nuevaopcion = new Option(comunas[index].comuna, comunas[index].comuna, false,true);
              select?.appendChild(nuevaopcion)
              continue
            }
            let  nuevaopcion = new Option(comunas[index].comuna, comunas[index].comuna, false,false);
            select?.appendChild(nuevaopcion)
          }
          for(let id of this.ids){
            let aux:any = document.getElementById(id);
            aux.value = eval("this.usuario."+id)
            if(id == "direccion.direccion"){
              this.profileInformation.controls["direccion"].setValue(this.usuario.direccion.direccion) 
            }else{
              this.profileInformation.controls[id].setValue(eval("this.usuario."+id)) 
            }
          }
          console.log(this.profileInformation.controls);
        }
      }, 500);
      
    }

    //llamar función para limpiar el formulario sin enviar
    this.resetForm();
  }
  editar(property:any){
    if(property == "direccion.direccion"){
      this.diredit = true;
    }
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

  buscar_ciudad(e:any){
    let select:any = document.getElementById("comuna");
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
    let  nuevaopcion = new Option("","", true,true);
    nuevaopcion.disabled = true;
    select?.appendChild(nuevaopcion)
    let comunas:Array<Comuna> = this.chile.getcomunas(e.target.value);
    for (let index = 0; index < comunas.length; index++) {
      let  nuevaopcion = new Option(comunas[index].comuna, comunas[index].comuna, false,false);
      select?.appendChild(nuevaopcion)
    }
  }

}
