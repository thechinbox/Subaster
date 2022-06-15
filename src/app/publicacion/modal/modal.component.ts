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
    const htmlEmail = '<div style="text-align: center;">'+
                        '<h1>Subaster</h1>'+
                        '<h4 style="margin-top: 20px">¡Hola! Gracias por comprar con nosotros.</h4>'+
                        '<h5>Te adjuntamos el recibo de tu compra:</h5>'+
                        '<h5>Código: 91839832213421412</h5>'+
                        '<h5>Artículo: TUBOS PVC LOTE 500</h5>'+
                        '<h5>Valor: CLP$ 500.000</h5>'+
                      '</div>'
    //console.log(this.montoValor.toString());
    let input = document.getElementById('confirmarBtn');
    input?.setAttribute('disabled', '');
    alert("Enviaremos un correo de confirmación a su cuenta");
    this._switchModal.SetPublicacionPujarSwitch(false);
    this._switchModal.ENVIARBOLETA(this.email, htmlEmail).subscribe((data) => {console.log(data)});
  }
}
