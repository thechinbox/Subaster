import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subasta } from 'back-end/Interfaces/subasta';
import { Puja } from '../data/Interfaces/puja';
import { AttributesService } from '../data/Services/attributes.service';
import { ChileinfoService } from '../data/Services/chileinfo.service';
import { PublicationService } from '../data/Services/publication.service';
import { UserService } from '../data/Services/user.service';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.scss']
})
export class SubastaComponent implements OnInit {
  comentarios:Array<any>;
  publication:Array<Subasta>;
  pujaminima = 0;
  pujaForm:FormGroup;
  signin = false;
  pujado = false;
  constructor(private publicationS: PublicationService, private activatedRoute:ActivatedRoute, 
              private attributes:AttributesService, private chileinfo:ChileinfoService, private userS:UserService) {
    this.comentarios = publicationS.obtenerComentarios();
    this.publication = new Array();
    this.publicationS.GETAUCTION(this.activatedRoute.snapshot.paramMap.get("id")).subscribe( data =>{
      this.publication.push(data)
      this.publicationS.GETMAXPUJA(this.activatedRoute.snapshot.paramMap.get("id")).subscribe( data2 =>{
        if(data2 == null){
          this.pujaminima = this.publication[0].precioinicial as number + 1 ;
        }else{
          this.pujaminima = data2 + 1;
        }
        console.log(data2);
        
        this.pujaForm.controls["valorpuja"].addValidators(Validators.min(this.pujaminima))
      })
      this.pujaminima = this.publication[0].precioinicial as number + 1;
      this.publication[0].estadoproducto =  this.attributes.getestado(data.estadoproducto)
      this.publication[0].unidad = this.attributes.getunidad(data.unidad)
      this.publication[0].categoria = this.attributes.getcategoria(data.categoria)
      this.publicationS.GETDIRECTION(this.publication[0].id).subscribe(data => {
        this.publication[0].direccion = data
        let region = this.chileinfo.getregion(this.publication[0].direccion.region)   
        let comuna = this.chileinfo.getcomuna(this.publication[0].direccion.region,this.publication[0].direccion.comuna)
        this.publication[0].direccion.region = region    
        this.publication[0].direccion.comuna = comuna
      })
      this.publicationS.GETMEDIA(this.publication[0].id).subscribe(data =>{
        this.publication[0].url = data
      })
    })
    this.pujaForm = new FormGroup({
      valorpuja : new FormControl('', [
        Validators.required
      ])
    })
    
    
  }

  ngOnInit(): void {
    
  }

  pujar(){
    if(sessionStorage.getItem("id") != null &&  sessionStorage.getItem("id") != undefined){
      var d = new Date,
      dformat = [d.getMonth()+1,
                d.getDate(),
                d.getFullYear()].join('/')+' '+
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');
      let hoy = new Date(dformat);
      let puja:Puja = {
        id:"",
        idusuario : sessionStorage.getItem("id") as string,
        idpublicacion: this.publication[0].id as string,
        valorpuja : this.pujaForm.controls["valorpuja"].value,
        fechapuja : hoy
      }
      this.publicationS.UPPUJA(puja, this.userS.getUser(), this.publication[0]).subscribe(data =>{
        this.pujado = true;
        setTimeout(()=>{
          this.pujado = false;
        },1500)
      })
    }else{
      this.signin = true;
      setTimeout(()=>{
        this.signin = false;
      },1500)
    }
  }
}
