import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import { element } from 'protractor';
import { of } from 'rxjs';
import { Console } from 'console';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  datos;
  ids = new Array();
  locate;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public mostrar:ClientService,
    private client: ClientService,
    private route: Router,
  ) { }

  async traerInformacion(){
    this.mostrar.getRequestAll(`${environment.BASE_API_REGISTER}/panel`).subscribe(
      (data): any => this.datos = data,
      error => console.log("Error al traer los datos")
    )
  }

  myfuntion(id){
   if(this.ids.includes(id)){
      this.locate = this.ids.findIndex(x => x === id);
      this.ids.splice(this.locate,id);
    }else{
      this.ids.push(id);
    }
  }
  
  refresh(){
    window.location.reload();
  }

  delete(){
    if(this.ids.length != 0){
      this.client.postRequest(`${environment.BASE_API_REGISTER}/remove`,this.ids).subscribe(
        (response)=>{
          console.log(response)
          window.location.reload();
        })
    }else{
      Swal.fire('Para borrar selecciona una casilla o varias')
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: ['',Validators.required]
    });

    this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
      (response: any) => {
        console.log(response);
      },(error) => {
        console.log(error);
        this.route.navigate(['/login'])
      });
    this.traerInformacion();
  }

  async onSubmit(){
    if(this.form.valid){
      let data = {
        search : this.form.value.search
      }
      this.client.postRequest(`${environment.BASE_API_REGISTER}/admin/search`, data).subscribe(
        (Response : any) => {
          this.datos = Response;
          console.log(Response);
        },(error) => {
          console.log(error);
        }
      )
    }
  }

}
