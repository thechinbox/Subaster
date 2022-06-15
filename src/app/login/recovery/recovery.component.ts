import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../data/Services/user.service';

@Component({
  selector: 'app-login-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  correoinvalido = false;
  recoverycontrol : FormGroup;
  pass: any = "-";

  constructor(private userService:UserService, private router:Router) {
    this.recoverycontrol = new FormGroup({
      email : new FormControl('', [
        Validators.required,
        Validators.email,
      ])
    })
   }

  ngOnInit(): void {

  }

  enviarRecovery(){
    const values = this.recoverycontrol.value;
    this.userService.VERIFYEMAIL(values.email).subscribe((data) => {
      if (data.status == "invalid") {
        this.correoinvalido = true;
      } else {
        let dataNew = data[0];
        //console.log(data);
        this.userService.EMAILRECOVERY(dataNew).subscribe((data) => {
          //console.log(data);
          if (data.status == "ok") {
            alert("Revisa tu correo electrónico con tu contraseña !")
          } else {
            alert("Ha ocurrido un error al enviar el correo...")
          }
        });
      }
    })
  }
}
