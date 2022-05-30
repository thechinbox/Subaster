import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logincontrol : FormGroup;

  constructor() {
    this.logincontrol = new FormGroup({
      email : new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.nullValidator,
        Validators.maxLength(50)
      ]),
      pass : new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(10),
        Validators.maxLength(20)
      ]),

    })
   }

  ngOnInit(): void {
  }

}
