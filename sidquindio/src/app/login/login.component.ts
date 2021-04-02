import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode'

import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  spinner: boolean = true;
  tokee: any;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  } 


  async onSubmit(){

    if (this.form.valid){
      let data ={
        email: this.form.value.email,
        password: this.form.value.password
      }
      this.spinner = false;
      this.client.postRequest(`${environment.BASE_API_REGISTER}/login`, data).subscribe(
      (response: any) => {
        this.auth.login(response.token);
        this.auth.setCourrentUser(response.nombre);
        this.auth.setRangertUser(response.rango);
        this.route.navigate( ['/']);
        this.tokee = jwt_decode(localStorage.getItem('token'));
        console.log(this.tokee.rango);
      },
      (error) => {
        this.spinner = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Los datos ingresados son incorrectos!',
        })
      })
    } else {
      Swal.fire('Ingrese su correo y contraseña')
    }
    
  }
}
