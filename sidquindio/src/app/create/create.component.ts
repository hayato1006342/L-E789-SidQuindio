import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  spinner: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      seleccion: ['', Validators.required],
      descripcion: ['', Validators.required],
      precios: ['', Validators.required],
      video: ['', Validators.required],
  })
  }

  async onSubmit(){
    if (this.form.valid){
      let data ={
        nombre: this.form.value.nombre,
        seleccion: this.form.value.seleccion,
        descripcion: this.form.value.descripcion,
        precios: this.form.value.precios,
        video: this.form.value.videos
      };
      console.log(data);
      Swal.fire({
        title: 'Seguro?',
        text: "Esta seguro que desea ingresar un nuevo sitio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: '................',
            showConfirmButton: false,
            timer: 1500
          })
          this.spinner = false;
          this.client.postRequest(`${environment.BASE_API_REGISTER}/crear`, data).subscribe(
            (response: any) => {
              this.route.navigate( ['/paneladmin']);
              console.log(response);
            },
            (error) => {
              this.spinner = true;
              console.log(error);
            })
          } else {
            this.spinner = true;
            console.log("Error");
          }
       
      }) 

    }
    
  }

}
