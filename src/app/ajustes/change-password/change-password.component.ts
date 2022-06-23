import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changepass:FormGroup;
  matchPass = false;
  constructor() {
    this.changepass = new FormGroup({
      actual : new FormControl('', [
        Validators.required
      ]),
      nueva : new FormControl('', [
        Validators.required
      ]),
      repite : new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
    let nomatch:any = document.getElementById("nomatch")
    nomatch.style.display = "none";
    let repeat = document.getElementById("repita")
    repeat?.addEventListener('input', (e:any)=>{
      let pass:any = document.getElementById("pass")
      let error:any = document.getElementById("nomatch")
      if(pass.value != e.target.value){
        error.style.display = "block"
        this.matchPass = false;
      }else if (pass.value == e.target.value){
        error.style.display = "none"
        this.matchPass = true;
      }else if(e.target.vale == null ){
        error.style.display = "none"
        this.matchPass = false;
      }
    }) 
  }

}
