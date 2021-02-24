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
    public mostrar:ClientService
  ) { }

  traerInformacion(){
    this.mostrar.getRequestAll(`${environment.BASE_API_REGISTER}/panel`).subscribe(
      (data): any => this.datos = data["datos"],
      error => console.log("Error al traer los datos")
    )
  }


  ngOnInit(): void {
    this.traerInformacion();
  }

}
