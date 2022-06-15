import { Component, OnInit } from '@angular/core';
import { ModalSwitchService } from 'src/app/data/Services/modal-switch.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-publicacion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  montoControl: FormGroup;
  email:any = "testsubaster@gmail.com";

  constructor(private _switchModal: ModalSwitchService) {
    this.montoControl = new FormGroup({
      monto : new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+')
      ])
    })
  }

  ngOnInit(): void {

  }

  cerrarModal(){
    this._switchModal.SetPublicacionPujarSwitch(false);
  }
  realizarPuja(){
    //console.log(this.montoValor.toString());
    let input = document.getElementById('confirmarBtn');
    input?.setAttribute('disabled', '');
    alert("Enviaremos un correo de confirmación a su cuenta");
    this._switchModal.SetPublicacionPujarSwitch(false);
    this._switchModal.confirmarPuja(this.email).subscribe((data) => {console.log(data)});
  }
}
