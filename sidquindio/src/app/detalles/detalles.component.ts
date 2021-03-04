import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';
import { BuyService } from '../buy.service';

import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  form: FormGroup;
  spinner: boolean = true;


  precio1:number = 55000;
  precio2:number = 45000;
  precio3:number = 95000;
  
  constructor(    
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService,
    private buy: BuyService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      op1: ['0', Validators.required],
      op2: [ this.precio1, Validators.required],
      op3: [ 0, Validators.required],
  });


  

  this.client.getRequest(`${environment.BASE_API_REGISTER}/detalles`,localStorage.getItem('token')).subscribe(
    (response: any) => {
      console.log(response);
    },(error) => {
      console.log(error);
      this.route.navigate(['/login'])
    })

  }


  async onSubmit(){

    if (this.form.valid){
      let data ={
        opcion1: this.form.value.op1,
        opcion2: this.form.value.op2,
        opcion3: this.form.value.op3
      }
      this.buy.RecibirInformacion(data);
      console.log(data);
      Swal.fire({
        title: 'Seguro?',
        text: "Esta seguro que desea comprar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Gracias por su compra',
            showConfirmButton: false,
            timer: 1400
          })
          this.spinner = false;
          this.client.postRequest(`${environment.BASE_API_REGISTER}/detalles`, data).subscribe(
            (response: any) => {
              this.route.navigate( ['/compras']);
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
