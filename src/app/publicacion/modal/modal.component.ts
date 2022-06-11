import { Component, OnInit } from '@angular/core';
import { ModalSwitchService } from 'src/app/data/Services/modal-switch.service';

@Component({
  selector: 'app-publicacion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private _switchModal: ModalSwitchService) { }

  ngOnInit(): void {

  }

  cerrarModal(){
    this._switchModal.SetPublicacionPujarSwitch(false);
  }
}
