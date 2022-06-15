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

  enviarRecovery() {

  }

  buscarUser(id:string){

  }
}
