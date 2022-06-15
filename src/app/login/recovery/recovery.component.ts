import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/data/Interfaces/user';
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
        const dataNew:User = data[0];
        const htmlEmail = '<div style="text-align: center;">' +
                              '<h1>Subaster</h1>' +
                              '<h4 style="margin-top: 20px">¡Hola! Hemos visto que has perdido tu contraseña</h4>' +
                              '<h4 style="margin-top: 20px">A continuación te adjuntamos tu contraseña, recuerda</h4>' +
                              '<h4 style="margin-top: 20px">no compartir tu contraseña con nadie, si crees que alguien</h4>' +
                              '<h4 style="margin-top: 20px">está usando tu cuenta sin tu consentimiento, contacta a</h4>' +
                              '<h4 style="margin-top: 20px">Subaster. Saludos !</h4>' +
                              '<h5>Contraseña: INSERTARCONTRASENANUEVA </h5>' +
                          '</div>';
        //console.log(data);
       
        this.userService.EMAILRECOVERY(dataNew.correo, htmlEmail).subscribe((data) => {
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
