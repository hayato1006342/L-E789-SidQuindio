import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'

import Swal from 'sweetalert2/dist/sweetalert2.js'
@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

form: FormGroup;
spinner: boolean = true;
datos;
answer;

constructor(
  private fb: FormBuilder, 
  private route: Router,
  private client: ClientService,
  private routes : ActivatedRoute) { }

ngOnInit(): void {
  this.form = this.fb.group({
    password: ['', Validators.required],
    validatepassword: ['', Validators.required],
  });

  this.routes.paramMap
      .subscribe((params : ParamMap) => {
      let id = + params.get('id');
      this.traerDatos(id);
    });

} 

async traerDatos(id:number){
  this.client.getRequestId(`${environment.BASE_API_REGISTER}/recovery-passw/` + id).subscribe(
    (data): any =>{
      this.datos = data;
      if(this.datos.codestatus){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Codigo valido',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El codigo a expirado!',
          footer: '<a href="http://localhost:4200/recover"> Vuelve a realizar el proceso?</a>'
        })
        this.route.navigate( ['/']);
      }
    },(error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El codigo no es valido!',
      })
      this.route.navigate( ['/']);
    }
  );
}


async onSubmit(){

  if (this.form.valid){
    let data ={
      password: this.form.value.password,
      validatepassword: this.form.value.validatepassword,
      code: this.datos.code
    }
    console.log(data)
    this.client.postRequest(`${environment.BASE_API_REGISTER}/modification-pass`, data).subscribe(
    (response: any) => {
      this.answer = response
      if (this.answer.modifi){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se realizo el cambio de contraseña exitosamente',
          showConfirmButton: false,
          timer: 2500
        })
        this.route.navigate( ['/login']);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al intentar recuperar la contraseña',
        })
      }
    },(error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas ingresadas no son iguales!',
      })
    })

    }
  }
}
