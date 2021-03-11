import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { HttpClient,HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';
import { BuyService } from '../buy.service';
import { AuthService } from '../auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  public precio1:number = 5000;
  public precio2:number = 45000;
  public precio3:number = 95000;
  public cantidad1:boolean = true;
  public cantidad2:boolean = false;
  public cantidad3:boolean = false;


  datos;
  form: FormGroup;
  spinner: boolean = true;

  
  constructor(    
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService,
    public auth : AuthService,
    private buy: BuyService,
    private routes : ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      op1: [ 0, Validators.required],
      precio: [ 0, Validators.required],
      cantidad: [ 0, Validators.required],
  });

  this.routes.paramMap
      .subscribe((params : ParamMap) => {
      let id = + params.get('id');
      this.traerDatos(id);
    });


  this.client.getRequest(`${environment.BASE_API_REGISTER}/detalles`,localStorage.getItem('token')).subscribe(
    (response: any) => {
      console.log(response)
    },(error) => {
      console.log(error);
      this.auth.logout()
    })

  }

  async traerDatos(id:number){
    this.client.getRequestId(`${environment.BASE_API_REGISTER}/detalless/` + id).subscribe(
      (data): any =>{
        this.datos = data
      },(error)=>{
        console.log("Ah ocurrido un error")
      }
    );
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
