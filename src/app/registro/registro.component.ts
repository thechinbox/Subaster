import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comuna } from '../data/Interfaces/comuna';
import { Direccion } from '../data/Interfaces/direccion';
import { Region } from '../data/Interfaces/region';
import { User } from '../data/Interfaces/user';
import { ChileinfoService } from '../data/Services/chileinfo.service';
import { UserService } from '../data/Services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  title="google-maps"

  matchPass = false;
  cargando = false;
  subido = false;
  send = false;
  err = false;
  registrocontrol : FormGroup;
  regiones:Array<Region>;
  lng:number;
  lat:number;
  constructor(private geografia:ChileinfoService, private router:Router, private userS:UserService, private fb:FormBuilder) {
    this.lat = 0;
    this.lng = 0;
    this.regiones = this.geografia.getregiones();
    this.registrocontrol = new FormGroup({})
    this.registrocontrol = fb.group({
      names : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      email : new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      pass : new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(10),
        Validators.maxLength(30)
      ]),
      lastname : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      phone : new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]{9}")
      ]),
      repeatpass : new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(10),
        Validators.maxLength(30),
      ]),
      region: new FormControl('',[
        Validators.required
      ]),
      comuna: new FormControl('',[
        Validators.required
      ]),
      direccion : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
    })
   } 

  ngOnInit() {
    let select:any = document.getElementById("comuna");
    let direccion:any = document.getElementById("direccion");
    select.disabled = true;
    direccion.disabled = true;
    
    let nomatch:any = document.getElementById("nomatch")
    nomatch.style.display = "none";
    let repeat = document.getElementById("repeatpass")
    repeat?.addEventListener('input', (e:any)=>{
      let pass:any = document.getElementById("pass")
      let error:any = document.getElementById("nomatch")
      if(pass.value != e.target.value){
        error.style.display = "block"
        this.matchPass = false;
      }else if (pass.value == e.target.value){
        error.style.display = "none"
        this.matchPass = true;
      }else if(e.target.vale == null ){
        error.style.display = "none"
        this.matchPass = false;
      }
    }) 
  }

  buscar_ciudad(e:any){
    let select:any = document.getElementById("comuna");
    select.disabled = false;
    let direccion:any = document.getElementById("direccion");
    direccion.value = null;
    direccion.disabled = true;
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
    let  nuevaopcion = new Option("","", true,true);
    nuevaopcion.disabled = true;
    select?.appendChild(nuevaopcion)
    let comunas:Array<Comuna> = this.geografia.getcomunas(e.target.value);
    for (let index = 0; index < comunas.length; index++) {
      let  nuevaopcion = new Option(comunas[index].comuna, comunas[index].comuna, false,false);
      select?.appendChild(nuevaopcion)
    }
  }

  enable(e:any){
    let direccion:any = document.getElementById("direccion");
    direccion.disabled = false;
  }

  async direccionShow(e:any){
    let region = this.registrocontrol.value.region
    let comuna = this.registrocontrol.value.comuna
    let direccion:any = document.getElementById("direccion");
    if(direccion.value.trim() != "" && direccion.value != null){
      let direccion = (<HTMLInputElement>document.getElementById("direccion")).value;
      let geocoder = new google.maps.Geocoder();
      console.log(direccion + "," + comuna + "," + region);

      await geocoder.geocode({ 'address': direccion + "," + comuna + "," + region}, async (results, status) =>{
        if(status == google.maps.GeocoderStatus.OK){
          let resultados:any = results;
          this.lat = await resultados[0].geometry.location.lat();
          this.lng = await resultados[0].geometry.location.lng();
          console.log(this.lat,this.lng);
          
        }
      })
    }
  }

  async waitUpload(){
    let status:any
    let form:any = document.getElementById("formulario")
    form.style.display = 'none';
    this.send = true;
    this.cargando = true;
    let values = this.registrocontrol.value
    for(let i in this.regiones){
      if(this.regiones[i].region == values.region){
        values.region = this.regiones[i].id;
        for(let j in this.regiones[i].comunas){
          if(this.regiones[i].comunas[j].comuna == values.comuna){
            values.comuna = this.regiones[i].comunas[j].id
            break;
          }
        }
        break;
      }
    }
    let direccion:Direccion = {
      id:"",
      region:values.region,
      comuna:values.comuna,
      direccion:values.direccion,
      latitud:this.lat,
      longitud:this.lng
    };
    var d = new Date,
    dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
    let hoy = new Date(dformat);
    let newUser:User = {
      "nombre":values.names,
      "apellidos":values.lastname,
      "correo":values.email,
      "celular":values.phone,
      "direccion":direccion,
      "contrasena":values.pass,
      "fechacreacion":hoy,
      "id":"",
    }
    await this.userS.SIGNUP(newUser).subscribe(data =>{
      if(data.status == undefined){
        this.cargando = false;
        this.subido = true;
        setTimeout(() => {
          this.router.navigateByUrl("/login")
        }, 1000);
      }else{
        this.cargando = false;
        this.err = true;
        form.style.display = 'block'
        this.registrocontrol.reset();
        setTimeout(() => {
          this.err = false;
        }, 5000);
      }
    })
    
  }

 
}
