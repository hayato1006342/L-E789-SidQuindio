import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  spinner: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      validatepassword: ['', Validators.required],
    });
  } 


  async onSubmit(){

    if (this.form.valid){
      let data ={
        nombre: this.form.value.nombre,
        email: this.form.value.email,
        password: this.form.value.password,
        validatepassword: this.form.value.password
      }

      console.log(data);
      this.spinner = false;
      this.client.postRequest(`${environment.BASE_API_REGISTER}/registro`, data).subscribe(
      (response: any) => {
        Swal.fire('Usted se a registrado exitosamente')
        this.route.navigate( ['/login']);
        console.log(response);
      },
      (error) => {
        this.spinner = true;
        console.log(error);
      })
    } else {

      console.log("Error");
    }
    
  }

}
