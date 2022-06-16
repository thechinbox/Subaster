import { Component, Input, OnInit } from '@angular/core';
import { ModalSwitchService } from 'src/app/data/Services/modal-switch.service';

@Component({
  selector: 'app-verimagen',
  templateUrl: './verimagen.component.html',
  styleUrls: ['./verimagen.component.scss']
})
export class VerimagenComponent implements OnInit {
  @Input() url:any;

  constructor(private _switch:ModalSwitchService) { }

  ngOnInit(): void {
  }

  cerrarImagen(){
    this._switch.SetVerImagen(false)
  }

}
