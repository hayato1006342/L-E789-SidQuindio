import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.component.html',
  styleUrls: ['./historial-compra.component.css']
})
export class HistorialCompraComponent implements OnInit {

  datos;
  token;
  constructor(
    public mostrar:ClientService,
    private client: ClientService,
    private route: Router,
  ) { }

  traerInformacion(){
    this.token = jwt_decode(localStorage.getItem('token'));
    let data = {
      user: this.token.email
    };
    console.log(this.token.email);
    this.mostrar.postRequest(`${environment.BASE_API_REGISTER}/history`, data).subscribe(
      (data): any => {
        this.datos = data;
      },(error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No hay datos debido a que usted no ha realizado ninguna compra!',
        })
      }
    )
  }


  ngOnInit(): void {
    this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
    (response: any) => {
      this.traerInformacion();
      console.log(response);
    },(error) => {
      console.log(error);
      this.route.navigate(['/login'])
    })
  }

}
