import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-recover-email',
  templateUrl: './recover-email.component.html',
  styleUrls: ['./recover-email.component.css']
})
export class RecoverEmailComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClientService) { }

  form: FormGroup;
  spinner: boolean = true;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  async onSubmit(){
    if (this.form.valid){
      let data ={
        email: this.form.value.email,
    }
    this.spinner = false;
    this.client.postRequest(`${environment.BASE_API_REGISTER}/recovery` , data).subscribe(
      (response: any)=>{
        Swal.fire('Revise el correo electronico')
        this.spinner = true;
      },(error) => {
        this.spinner = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo ingresado no es valido!',
        })
      }
    )
    }
  }
}
