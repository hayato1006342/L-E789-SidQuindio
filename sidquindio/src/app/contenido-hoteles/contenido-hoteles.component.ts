import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-contenido-hoteles',
  templateUrl: './contenido-hoteles.component.html',
  styleUrls: ['./contenido-hoteles.component.css']
})
export class ContenidoHotelesComponent implements OnInit {

  datos;
  formdata: FormGroup;
  formsearch : FormGroup;

  constructor(
    public mostrar:ClientService,
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService
  ) { }

  traerInformacion(){
    this.mostrar.getRequestAll(`${environment.BASE_API_REGISTER}/hotels`).subscribe(
      (data): any => this.datos = data,
      error => console.log("Error al traer los datos")
    )
  }


  ngOnInit(): void {
    this.traerInformacion();
    this.formdata = this.fb.group({
      place: [ 0 ,Validators.required],
      category : [ 0 , Validators.required]
    })
    this.formsearch = this.fb.group({
      search: ['', Validators.required]
    })
  }
  

  async onSubmit(){
    let data ={
          place: this.formdata.value.place,
          category : this.formdata.value.category
      };
      console.log(data)
      this.client.postRequest(`${environment.BASE_API_REGISTER}/filter/hotel`, data).subscribe(
        (data : any)=> {
          this.datos = data
        },(error) => {
          console.log("Error", error);
        }
    )};


  async onSubmitsearch(){
    if (this.formsearch.valid){
      let data = {
        search: this.formsearch.value.search
      };
      this.client.postRequest(`${environment.BASE_API_REGISTER}/search/hotel`, data).subscribe(
        (data : any)=> {
          this.datos = data;
        },(error) => {
          console.log("Error", error);
        }
    )};
  }

}

