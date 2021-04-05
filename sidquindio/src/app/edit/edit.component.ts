import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute , ParamMap } from '@angular/router';
import {environment} from '../../environments/environment'

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  datos;
  spinner: boolean = true;
  id;

  constructor(
    private client: ClientService,
    private route: Router,
    private routes : ActivatedRoute,
    private fb: FormBuilder, ) { }



  async myFormulario(){
    this.form = this.fb.group({
      name: [ this.datos[0].name ,Validators.required],
      type: [ this.datos[0].type, Validators.required],
      img: [this.datos[0].img, Validators.required],
      imgc1: [this.datos[0].imgc1, Validators.required],
      imgc2: [this.datos[0].imgc2, Validators.required],
      imgc3: [this.datos[0].imgc3, Validators.required],
      category: [ this.datos[0].category, Validators.required],
      locate: [this.datos[0].locate, Validators.required],
      description: [this.datos[0].description, Validators.required]
    });
  };


  ngOnInit(): void {
    this.routes.paramMap
    .subscribe((params : ParamMap) => {
    let id = + params.get('id');
    this.id = id;
    this.client.getRequestId(`${environment.BASE_API_REGISTER}/admin/edit/`+ id).subscribe(
      (Response : any) =>{
        this.datos = Response;
        this.myFormulario();
      },(error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No puede editar algo que no existe' ,
        })
        this.route.navigate( ['/paneladmin']);
      });
  });


  this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
    (response: any) => {
      console.log(response);
    },(error) => {
      console.log(error);
      this.route.navigate(['/login']);
    });

  }

  async onSubmit(){
    this.spinner = false;
    if(this.form.valid){
      let data = {
        name: this.form.value.name,
        type: this.form.value.type,
        img: this.form.value.img,
        imgc1: this.form.value.imgc1,
        imgc2: this.form.value.imgc2,
        imgc3: this.form.value.imgc3,
        category: this.form.value.category,
        locate: this.form.value.locate,
        description: this.form.value.description,
        id : this.id,
      };
      this.client.postRequest(`${environment.BASE_API_REGISTER}/admin/edit`, data).subscribe(
        (Response :any) => {
          this.spinner = true;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se actualizo exitosamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.route.navigate( ['/paneladmin']);
        }
      )
    }else{
      this.spinner = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Compruebe que todos los campos tiene informacion',
      });
    }
  }

}
