import { HttpHeaders,HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalSwitchService {

  publicacionPujarSwitch = new Subject<any>(); //Objecto que emite un booleano
  imagenSwitch = new Subject<any>();
  HttpUploadOptions = {
    headers: new HttpHeaders(
      {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Content-Type': 'application/json',
    }
    ),
  };;

  constructor(private http:HttpClient) {
  }

  getPublicacionPujarSwitch(): Observable<any> {
    return this.publicacionPujarSwitch.asObservable();
  }
  SetPublicacionPujarSwitch(valor:boolean){
    this.publicacionPujarSwitch.next(valor)
  }
  getImagenSwitch(): Observable<any> {
    return this.imagenSwitch.asObservable();
  }
  SetVerImagen(valor:boolean){
    this.imagenSwitch.next(valor)
  }
  ENVIARBOLETA(toEmail:string, htmlTemplate:string): Observable<any>{
    return this.http.post(`${environment.hostname}/enviarcorreo`,JSON.stringify({to: toEmail, emailTemplate: htmlTemplate}), this.HttpUploadOptions);
  }
}
