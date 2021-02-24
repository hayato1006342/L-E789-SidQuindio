import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  spinner: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService) { }

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
      console.log(data);
      this.spinner = false;
      this.client.postRequest(`${environment.BASE_API_REGISTER}/login`, data).subscribe(
      (response: any) => {
        this.route.navigate( ['/']);
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
