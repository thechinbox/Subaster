import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../data/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  send = false;
  cargando = false;
  subido = false;
  correoinvalido = false;
  contrasenainvalida = false;
  logincontrol : FormGroup;
  constructor(private userService:UserService, private router:Router) {
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

  async waitUpload(){
    this.cargando = true;
    this.send = true;
    let values = this.logincontrol.value
    await this.userService.LOGIN(values.email,values.pass).subscribe(data =>{
      if(data.status == "invalid"){
        this.cargando = false;
        this.send = false;
        this.logincontrol.reset()
        this.correoinvalido = true;
        setTimeout(() => {
          this.correoinvalido = false;
        }, 5000);
      }else if(data.status == "invalidpassword"){
        this.cargando = false;
        this.send = false;
        this.logincontrol.reset()
        this.contrasenainvalida = true;
        setTimeout(() => {
          this.contrasenainvalida = false;
        }, 5000);
      }else{
        this.userService.GETDIRECCION(data.id).subscribe(data2 =>{
          this.cargando = false;
          this.subido = true;
          data.direccion = data2 
          this.userService.setUsuario(data)
          setTimeout(() => {
            this.router.navigateByUrl("/home")
          }, 1000);
        })
      }
    })
  }
}
