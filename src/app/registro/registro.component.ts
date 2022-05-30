import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registrocontrol : FormGroup;
  constructor() {
    this.registrocontrol = new FormGroup({})
   }

  ngOnInit(): void {
  }

}
