import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChileinfoService } from '../data/Services/chileinfo.service';
import { AttributesService } from '../data/Services/attributes.service';
import { Region } from '../data/Interfaces/region';
import { Comuna } from '../data/Interfaces/comuna';
import { Categoria } from '../data/Interfaces/categoria';
import { Estadoproducto } from '../data/Interfaces/estadoproducto';
import { Unidad } from '../data/Interfaces/unidad';
import { Publish } from '../data/Interfaces/publish';
import { Direccion } from '../data/Interfaces/direccion';
import { PublicationService } from '../data/Services/publication.service';
import { StorageService } from '../data/Services/storage.service';
import {MediaContent} from '../data/Interfaces/media-content'
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Subasta } from '../data/Interfaces/subasta';


@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})

export class PublishComponent implements OnInit, AfterViewInit {
  region ="";
  comuna ="";
  media:any [] = [];
  //Listas y Dropdowns
  lista_Cat:Array<Categoria>;
  lista_Est:Array<Estadoproducto>;
  lista_Unit: Array<Unidad>;
  isCollapsed = true;
  subastaOn = false;
  minDateE = false;
  nombre = "usuario";
  lat:number;
  lng:number;
  map:any
  regiones:Array<Region>;
  hoy:any;
  gmt:any;
  //Formulario
  publicacionForm : FormGroup;

  constructor(private atributos:AttributesService, private geografia:ChileinfoService, private publicar:PublicationService, 
              private storageService:StorageService, private router:Router, private calendar: NgbCalendar) { 
    let hoy = new Date()
    this.gmt = "GMT" + String(hoy).split("GMT")[1]
    this.hoy = hoy.toLocaleDateString().split("/");
    for(let i in this.hoy){
      if(this.hoy[i].length == 1){
        this.hoy[i] = '0'+this.hoy[i];
      }
    }
    this.hoy.reverse()
    console.log(new Date(this.hoy.join("-")+"GMT-0400"))
    
    let a =this.atributos.getactivepub()   
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

  ngOnInit(): void {
    let cargando:any = document.getElementById("cargando")
    let subiendo:any = document.getElementById("subido")
    let select:any = document.getElementById("comuna");
    let direccion:any = document.getElementById("direccion");
    cargando.style.display = "none";
    subiendo.style.display = "none";
    select.disabled = true;
    direccion.disabled = true;
    this.map = new google.maps.Map(document.getElementById('google') as HTMLElement, {
      center: {lat: this.lat, lng: this.lng},
      zoom: 15
    });  
  }

  initMap(){

  }
  checkbox(event:any){
    if(event.target.checked){
      this.subastaOn = true;
      this.publicacionForm.addControl('precioI', new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]))
      this.publicacionForm.addControl('date', new FormControl('', [
        Validators.required
      ]))
      this.publicacionForm.removeControl('precio')
    }else{
      this.subastaOn = false;
      this.publicacionForm.removeControl('precioI')
      this.publicacionForm.addControl('precio', new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]))
    }   
  }

  date(event:any){
    let select  = event.target.value as Date;
    let hoy = this.hoy.join("-") as Date
    this.minDateE = select > hoy? false:true;
    console.log(hoy, select);
    
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
          this.map = new google.maps.Map(document.getElementById('google') as HTMLElement, {
            center: {lat: this.lat, lng: this.lng},
            zoom: 18
          });
          let marker = new google.maps.Marker({
            position: {lat: this.lat, lng: this.lng},
            map: this.map,
          });
        }
      })
    }
  }

  deletemedia(i:any){    
    delete this.media[i]
    this.media = this.media.filter(function (el) {
      return el != null;
    });

    let d:any= document.getElementById("media");
    if(this.media.length == 0){
      d.value = null
    }
  }


  cargarImagen(event:any){
    let archivos = event.target.files
    for(let i=0; i<archivos.length; i++){
      let reader = new FileReader();
      reader.readAsDataURL(archivos[i]);
      reader.onloadend = () =>{
        this.media.push(reader.result);        
      }
    }
    
    
  }

  async waitUpload(){
    let form:any = document.getElementById("formulario")
    let cargando:any = document.getElementById("cargando")
    let subido:any = document.getElementById("subido")
    cargando.style.display = "block";
    form.style.display = "none";
    await this.onSubmit().then(data =>{
      cargando.style.display = "none";
      subido.style.display = "block";
      setTimeout(() => {
        this.router.navigateByUrl("/home")
      }, 1000);
    })
    
  }

  async onSubmit() {
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
    let urlsFirebase= new Array();
    for(let url of this.media){
      await this.storageService.subirImagen(this.nombre + "-" + Date.now(), url).then( data =>{
        urlsFirebase.push({
          url: data
        })
      })
    }
    let sub:any = document.getElementById("subastar")
    if(sub.checked == true){
      let auction:Subasta = {
        id:"",
        nombre:values.nombre,
        descripcion:values.descripcion,
        categoria:values.categoria,
        unidad:values.unidad,
        estadoproducto:values.estado,
        estadopublicacion:this.atributos.getactivepub(),
        fechapublicacion: hoy,
        fechafinalizacion: values.date + this.gmt as Date,
        precioinicial:values.precioI,
        cantidad:values.cantidad,
        direccion:direccion,
        url: urlsFirebase
      }
      this.publicar.AUCTION(auction).subscribe(datos =>{
        console.log(datos);
      })
    }else{
      let publish:Publish = {
        id:"",
        nombre:values.nombre,
        descripcion:values.descripcion,
        categoria:values.categoria,
        unidad:values.unidad,
        estadoproducto:values.estado,
        estadopublicacion:this.atributos.getactivepub(),
        fechapublicacion: hoy,
        precio:values.precio,
        cantidad:values.cantidad,
        direccion:direccion,
        url: urlsFirebase
      }
  
      this.publicar.PUBLISH(publish).subscribe(datos =>{
        console.log(datos);
      })
    }
  }

}
