import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators,  } from '@angular/forms';
import { ClientService } from '../client.service';
import {environment} from '../../environments/environment'
import { BuyService } from '../buy.service';
import { Router } from '@angular/router';


import Swal from 'sweetalert2/dist/sweetalert2.js'
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(public buy: BuyService,
    private route: Router,
    private client: ClientService,
    private fb: FormBuilder) { }

  token;
  data:any;
  code = Math.floor((Math.random() * 99999999) + 1);
  form: FormGroup;
  date = new Date()
  fecha = this.date.setDate(this.date.getDate() + 15);
  
  

  async myFormulario(){
    this.form = this.fb.group({
      name: [ {value: this.data['name'][0].name, disabled: true},Validators.required],
      locate: [{value: "Quindio", disabled: true},Validators.required],
      code: [ {value: this.code, disabled: true},Validators.required ],
      amount : [ {value: this.data.cantidad, disabled: true},Validators.required],
      value : [ {value: this.data.opcion * this.data.cantidad, disabled: true},Validators.required],
    });
  }

  ngOnInit(): void {
    this.buy.subject.subscribe(response => this.data = response);

    if (this.data){
      this.route.navigate( ['/compras']);
      this.myFormulario()
    }else{
      this.route.navigate( ['/']);
    }
  }

  async onSubmit(){
    this.token = jwt_decode(localStorage.getItem('token'));
    let data ={
        user: this.token.email,
        name: this.form.value.name,
        locate : this.form.value.locate,
        code: this.form.value.code,
        amount: this.form.value.amount,
        value: this.form.value.value,
      };
      this.client.postRequest(`${environment.BASE_API_REGISTER}/purchase`,data).subscribe(
        (Response : any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Compra realizada con exito',
            showConfirmButton: false,
            timer: 2500
          });
          this.route.navigate( ['/historial']);

        },(error) =>{
          console.log(error);
        }
      )
  }
}
