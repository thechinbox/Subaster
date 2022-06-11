import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class ModalSwitchService {

  publicacionPujarSwitch = new Subject<any>(); //Objecto que emite un booleano

  constructor() {
  }

  getPublicacionPujarSwitch(): Observable<any> {
    return this.publicacionPujarSwitch.asObservable();
  }
  SetPublicacionPujarSwitch(valor:boolean){
    this.publicacionPujarSwitch.next(valor)
  }
}
