import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { } from '@angular/google-maps';
import { Comuna } from '../data/Interfaces/comuna';
import { Region } from '../data/Interfaces/region';
import { ChileinfoService } from '../data/Services/chileinfo.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registrocontrol : FormGroup;
  regiones:Array<Region>;
  lng:Number;
  lat:Number;
  constructor(private geografia:ChileinfoService) {
    this.lat = 0;
    this.lng = 0;
    this.regiones = this.geografia.getregiones();
    this.registrocontrol = new FormGroup({
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
        Validators.minLength(10),
        Validators.maxLength(50)
      ]),
      phone : new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern("^[0-9]")
      ]),
      repeatpass : new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(10),
        Validators.maxLength(30)
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
      ])

    })
   }



  async ngOnInit() {
    await this.añadirMapa();
  }

  async añadirMapa(){
    let mapa:any = document.getElementById('map');
    let map =  new google.maps.Map(mapa, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    mapa?.appendChild(map)
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

  direccionShow(e:any){
    let region = this.registrocontrol.value.region
    let comuna = this.registrocontrol.value.comuna
    let direccion:any = document.getElementById("direccion");
    if(direccion.value.trim() != "" && direccion.value != null){
      let direccion = (<HTMLInputElement>document.getElementById("direccion")).value;
      let geocoder = new google.maps.Geocoder();
      console.log(direccion + "," + comuna + "," + region);

      geocoder.geocode({ 'address': direccion + "," + comuna + "," + region}, (results, status) =>{
        if(status == google.maps.GeocoderStatus.OK){
          let resultados:any = results;
          this.lat = resultados[0].geometry.location.lat();
          this.lng = resultados[0].geometry.location.lng();
        }
      })
    }
  }
}
