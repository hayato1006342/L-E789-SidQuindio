import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  datos;

  constructor(
    public mostrar:ClientService,
    private client: ClientService,
    private route: Router,
  ) { }

  async traerInformacion(){
    this.mostrar.getRequestAll(`${environment.BASE_API_REGISTER}/panel`).subscribe(
      (data): any => this.datos = data,
      error => console.log("Error al traer los datos")
    )
  }

  ngOnInit(): void {
    this.client.getRequest(`${environment.BASE_API_REGISTER}/historial`,localStorage.getItem('token')).subscribe(
      (response: any) => {
        console.log(response);
      },(error) => {
        console.log(error);
        this.route.navigate(['/login'])
      });

      this.traerInformacion();
  }


}
