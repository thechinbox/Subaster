import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})

export class PublishComponent implements OnInit {
  //Comunas 
  Tarapaca = new Array("Arica");
  Antofagasta = new Array("Alto Hospicio","Iquique","Pozo Almonte");
  Atacama = new Array("Caldera","Chanaral","Copiapo","Diego de Almagro","El Salvador","Huasco","Tierra Amarilla","Vallenar");
  Coquimbo = new Array("Andacollo","Combarbala","Coquimbo","El Palqui","Illapel","La Serena","Los Vilos","Montepatria","Ovalle","Salamanca","Vicuna");
  Valparaiso = new Array("Algarrobo","Cabildo","Calle Larga","Cartagena","Casablanca","Catemu","Concon","El Melon","El Quisco","El Tabo","Hijuelas","La Calera","La Cruz","La Ligua","Las Ventanas","Limache","Llaillay","Los Andes","Nogales","Olmue","Placilla de Penuelas","Putaendo","Quillota","Quilpue","Quintero","Rinconada","San Antonio","San Esteban","San Felipe","Santa Maria","Santo Domingo","Valparaiso","Villa Alemana","Villa Los Almendros","Vina del Mar");
  OHiggins = new Array("Chimbarongo","Codegua","Donihue","Graneros","Gultro","Las Cabras","Lo Miranda","Machali","Nancagua","Palmilla","Peumo","Pichilemu","Punta Diamante","Quinta de Tilcoco","Rancagua","Rengo","Requinoa","San Fernando","San Francisco de Mostazal","San Vicente de Tagua Tagua","Santa Cruz");
  Maule = new Array("Cauquenes","Constitucion","Curico","Hualane","Linares","Longavi","Molina","Parral","San Clemente","San Javier","Talca","Teno","Villa Alegre");
  BioBio = new Array("Arauco","Bulnes","Cabrero","Canete","Chiguayante","Chillan","Chillan Viejo","Coelemu","Coihueco","Concepcion","Conurbacion La Laja-San Rosendo","Coronel","Curanilahue","Hualpen","Hualqui","Huepil","Lebu","Los alamos","Los angeles","Lota","Monte aguila","Mulchen","Nacimiento","Penco","Quillon","Quirihue","San Carlos","San Pedro de la Paz","Santa Barbara","Santa Juana","Talcahuano","Tome","Yumbel","Yungay");
  Araucania = new Array("Angol","Carahue","Collipulli","Cunco","Curacautin","Freire","Gorbea","Labranza","Lautaro","Loncoche","Nueva Imperial","Padre Las Casas","Pitrufquen","Pucon","Puren","Renaico","Temuco","Traiguen","Victoria","Villarrica");
  LosLagos = new Array("Futrono","La Union","Lanco","Los Lagos","Paillaco","Panguipulli","Rio Bueno","San Jose de la Mariquina","Valdivia");
  Aisen = new Array("Coihaique","Puerto Aisen");
  MagallanesyAntartica = new Array("Punta Arenas","Puerto Natales");
  Metropolitana = new Array("Alto Jahuel","Bajos de San Agustin","Batuco","Buin","Cerrillos","Cerro Navia","Colina","Conchali","Curacavi","El Bosque","El Monte","Estacion Central","Hospital","Huechuraba","Independencia","Isla de Maipo","La Cisterna","La Florida","La Granja","La Islita","La Pintana","La Reina","Lampa","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipu","Melipilla","Nunoa","Padre Hurtado","Paine","Pedro Aguirre Cerda","Penaflor","Penalolen","Pirque","Providencia","Pudahuel","Puente Alto","Quilicura","Quinta Normal","Recoleta","Renca","San Bernardo","San Joaquin","San Jose de Maipo","San Miguel","San Ramon","Santiago","Talagante","Tiltil","Vitacura");
  LosRios = new Array("Ancud","Calbuco","Castro","Fresia","Frutillar","Llanquihue","Los Muermos","Osorno","Puerto Montt","Puerto Varas","Purranque","Quellon","Rio Negro");
  AricayParinacota = new Array("Antofagasta","Calama","Maria Elena","Mejillones","Taltal","Tocopilla");
  region ="";
  comuna ="";

  //Listas y Dropdowns
  lista_Cat = ["Aceros y elementos metálicos ", "Electricidad",    "Artefactos sanitarios y gasfitería", "Revestimientos y estucos",
    "Maderas y muebles", "Equipos y herramientas", "Pinturas y accesorios", "Cerámicos y adhesivos", "Puertas y ventanas",
    "Residuos peligrosos", "Seguridad"];
  lista_Est = ["Nuevo","Usado","Usado-Como Nuevo","Nuevo-Abierto","Residuo"];
  lista_Unit = ["Sacos", "KG", "UN", "ML", "M2", "M3", "Cajas", "Tinetas", "Pallet"];
  isCollapsed = true;
  categoria:any = "Categorias"
  estado:any = "Estado";
  unidad:any = "Unidad";
  urli= new Array();
  urlv= new Array();
  
  lat:number;
  lng:number;

  constructor() {
    this.lat=0;
    this.lng=0;
  }


  ngOnInit(): void {
    
  }

  initMap(){
    
  }

  buscar_ciudad(e:any){
    let region = e.target.value;
    if (region != 0) {
        this.region = region;
        let comunas = eval("this."+region)
        let select:any = document.getElementById("comuna");
        while (select.firstChild) {
          select.removeChild(select.firstChild);
        }
        let  nuevaopcion = new Option("Comunas de " + region, String(0));     
        select?.appendChild(nuevaopcion)
        for (let index = 0; index < comunas.length; index++) {
          let  nuevaopcion = new Option(comunas[index], comunas[index]);     
          select?.appendChild(nuevaopcion)
        }       
        if(select.value = "0"){
          let input = <HTMLInputElement> document.getElementById("direccion")
          input.disabled = true;
        }
    }else{
      this.region = "";
      this.comuna = "";
      let select:any = document.getElementById("comuna");
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
      let input = <HTMLInputElement> document.getElementById("direccion")
      input.disabled = true;
    }
  }
  enable(e:any){
    if(e.target.value != "0"){
      this.comuna = e.target.value
      let input = <HTMLInputElement> document.getElementById("direccion")
      input.disabled = false;
    }
    else{
      let input = <HTMLInputElement> document.getElementById("direccion")
      input.disabled = true;
    }
  }

  direccionShow(e:any){
    let direccion = (<HTMLInputElement>document.getElementById("direccion")).value;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': direccion + "," + this.comuna + "," + this.region}, (results, status) =>{
      if(status == google.maps.GeocoderStatus.OK){
        let resultados:any = results;
        this.lat = resultados[0].geometry.location.lat();
        this.lng = resultados[0].geometry.location.lng();  
      }
    })
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

  selectCategory(categoria:any){
    this.categoria = categoria;
  }
  selectState(state:any){
    this.estado = state;
  }
  selectUnit(unit:any){
    this.unidad = unit;
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
  



  
}
