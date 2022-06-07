import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChileinfoService } from '../data/Services/chileinfo.service';
import { AttributesService } from '../data/Services/attributes.service';
import { Region } from '../data/Interfaces/region';
import { Comuna } from '../data/Interfaces/comuna';
import { Categoria } from '../data/Interfaces/categoria';
import { Estadoproducto } from '../data/Interfaces/estadoproducto';
import { Unidad } from '../data/Interfaces/unidad';
import { StorageService } from '../data/Services/storage.service';
import { url } from 'inspector';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})

export class PublishComponent implements OnInit, AfterViewInit {
  region ="";
  comuna ="";

  //Listas y Dropdowns
  lista_Cat:Array<Categoria>;
  lista_Est:Array<Estadoproducto>;
  lista_Unit: Array<Unidad>;
  isCollapsed = true;
  urli= new Array();
  urlv= new Array();

  lat:number;
  lng:number;

  regiones:Array<Region>;

  //Formulario
  publicacionForm : FormGroup;

  constructor(private atributos:AttributesService, private geografia:ChileinfoService, private storageService:StorageService) {
    this.lista_Cat = atributos.getcategorias();
    this.lista_Est = atributos.getestados();
    this.lista_Unit = atributos.getunidades();
    this.regiones = geografia.getregiones();
    this.lat=0;
    this.lng=0;
    this.publicacionForm = new FormGroup({
      media : new FormControl('', [
        Validators.required
      ]),
      nombre : new FormControl('', [
        Validators.required,
        Validators.nullValidator
      ]),
      descripcion : new FormControl('', [
        Validators.required,
        Validators.maxLength(150)
      ]),
      cantidad : new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      categoria : new FormControl('', [
        Validators.required
      ]),
      estado : new FormControl('', [
        Validators.required
      ]),
      unidad : new FormControl('', [
        Validators.required
      ]),
      precio : new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      region : new FormControl('', [
        Validators.required
      ]),
      comuna : new FormControl('', [
        Validators.required,
        Validators.nullValidator
      ]),
      direccion : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ])
    })

  }

  ngAfterViewInit(): void {
  }

  /*  FIREBASE SUBIR IMAGEN STORAGE* */
      imagenes:any [] = [];
      videos:any[] = [];
      cargarImagen(event:any){
        let archivos = event.target.files
        let nombre = "usuario";
        for(let i=0; i<archivos.length; i++){
          let reader = new FileReader();
          reader.readAsDataURL(archivos[0]);
          reader.onloadend = () =>{
            /* console.log(reader.result); */
            this.imagenes.push(reader.result);
            this.storageService.subirImagen(nombre + "-" + Date.now(), reader.result).then(urlImagen => {
              /* console.log(urlImagen); */
              /* let usuario={
                idusuario:"",
                productimg:""
              } */
            });
          }
        }
      }

  /*  */


  ngOnInit(): void {
    let select:any = document.getElementById("comuna");
    let direccion:any = document.getElementById("direccion");
    select.disabled = true;
    direccion.disabled = true;
  }

  initMap(){

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
    this.region = e.target.value
    this.comuna = ""
  }

  enable(e:any){
    let direccion:any = document.getElementById("direccion");
    direccion.disabled = false;
    this.comuna = e.target.value
  }

  direccionShow(e:any){
    let direccion:any = document.getElementById("direccion");
    if(direccion.value.trim() != "" && direccion.value != null){
      let direccion = (<HTMLInputElement>document.getElementById("direccion")).value;
      let geocoder = new google.maps.Geocoder();
      console.log(direccion + "," + this.comuna + "," + this.region);

      geocoder.geocode({ 'address': direccion + "," + this.comuna + "," + this.region}, (results, status) =>{
        if(status == google.maps.GeocoderStatus.OK){
          let resultados:any = results;
          this.lat = resultados[0].geometry.location.lat();
          this.lng = resultados[0].geometry.location.lng();
        }
      })
    }
  }

  deleteimg(i:any){
    delete this.urli[i]
    this.urli = this.urli.filter(function (el) {
      return el != null;
    });
    console.log(this.urli);

  }

  deletevid(i:any){
    delete this.urlv[i]
    this.urlv = this.urlv.filter(function (el) {
      return el != null;
    });
  }

  selectFile(event:any){
    if(event.target.files){
      let reader = new FileReader();
      if(event.target.files[0].type.split("/")[0] == "video"){
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event:any) =>{
          this.urlv.push(event.target.result)
        }
      }else if(event.target.files[0].type.split("/")[0] == "image"){
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event:any) =>{
          this.urli.push(event.target.result)
        }
      }
    }
  }

  onSubmit(): void {
    let values = this.publicacionForm.value
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


  }

}
