import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  datos;
  ids = new Array();
  locate;
  price;
  form: FormGroup;
  formprices: FormGroup;
  idprice;

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

  create(){
    window.location.href = "http://localhost:4200/crear"
  }
  edit(id){
    window.location.href = `http://localhost:4200/editar/` + id
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
          console.log(response);
          window.location.reload();
        })
    }else{
      Swal.fire('Para borrar selecciona una casilla o varias')
    }
  }

  prices(id){
    this.idprice = id;
    this.client.getRequestId(`${environment.BASE_API_REGISTER}/admin/precies/` + id).subscribe(
      (Response : any) => {
        this.price = Response;
      },(error) =>{
        console.log(error);
        Swal.fire(
          '',
          'Aun no hay precios definidos, agregalos!',
          'info'
        );
        this.price = 0;
      }
    )
  }

  deleteprice(id,id_place){
    this.client.postRequest(`${environment.BASE_API_REGISTER}/admin/delete/price`, id).subscribe(
      (Response : any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se borro con exito',
          showConfirmButton: false,
          timer: 2500
        });
        this.prices(id_place);
      },(error) =>{
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: ['',Validators.required]
    });

    this.formprices = this.fb.group({
      price: [ , Validators.required],
    })

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
      };
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

  async onSubmitP(){
    if(this.formprices.valid){
      let data = {
        id : this.idprice,
        price : this.formprices.value.price
      };
      this.client.postRequest(`${environment.BASE_API_REGISTER}/admin/add/price`, data).subscribe(
        (Response : any) =>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se agrego con exito',
            showConfirmButton: false,
            timer: 2500
          });
          this.prices(data.id);
        },(error) => {
          console.log("Error al crear", error)
        }
      )
    }else{
      Swal.fire('Ingrese un monto')
    }
  }

}
