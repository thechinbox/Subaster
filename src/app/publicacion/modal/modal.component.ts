import { Component, OnInit } from '@angular/core';
import { ModalSwitchService } from 'src/app/data/Services/modal-switch.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
//import { sendMail } from 'src/js/emailer';

@Component({
  selector: 'app-publicacion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  montoControl: FormGroup;
  montoValor: number;

  constructor(private _switchModal: ModalSwitchService) {
    this.montoValor = 0;
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
    //sendMail();
    alert("Hemos enviado un correo electrónico de confirmación");
    this._switchModal.SetPublicacionPujarSwitch(false);
  }
}