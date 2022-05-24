import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
declare const google:any;

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit, AfterViewInit {
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

  //Google Maps
  lat!: number;
  lng!: number;
  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };    
  map:any;
  @ViewChild('mapRef', {static: true }) mapElement: any;


  constructor() { }


  ngOnInit(): void {
  }

  initMap(){
    
  }
  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition( (position) =>{
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude
    });
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center:{lat: -33.044995276237046, lng: -71.60793188713511},
      zoom : 10,
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
