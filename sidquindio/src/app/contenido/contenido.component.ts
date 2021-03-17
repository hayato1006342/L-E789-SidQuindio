import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  datos;
  formlug: FormGroup;

  constructor(
    public mostrar:ClientService,
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService
  ) { }

  traerInformacion(){
    this.mostrar.getRequestAll(`${environment.BASE_API_REGISTER}/sites`).subscribe(
      (data): any => this.datos = data,
      error => console.log("Error al traer los datos")
    )
  }


  ngOnInit(): void {
    this.traerInformacion();
    this.formlug = this.fb.group({
      name: [ ,Validators.required],
  })
  }
  

  async onSubmit(){
    if (this.formlug.valid){
      let data ={
          name: this.formlug.value.name,
      };
      this.client.postRequest(`${environment.BASE_API_REGISTER}/search`, data).subscribe(
        (data : any)=> {
          this.datos = data
          console.log(data)
        },(error) => {
          console.log("Error", error);
        }
     )};
  }
}
