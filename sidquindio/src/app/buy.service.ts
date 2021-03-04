import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  data:any
  subject = new BehaviorSubject<any>(this.check());

  private check() : any {
    return this.data;
  }


  RecibirInformacion(datos:any):void{
    this.data = datos;
    this.subject.next(datos)
  }

  constructor() { }
}
