import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registrocontrol : FormGroup;
  constructor() {
    this.registrocontrol = new FormGroup({
      names : new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      email : new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      pass : new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(10),
        Validators.maxLength(30)
      ]),
      lastname : new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]),
      phone : new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern("^[0-9]")
      ]),
      repeatpass : new FormControl('', [
        Validators.required,
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(10),
        Validators.maxLength(30)
      ]),


    })
   }



  ngOnInit(): void {
  }

}
