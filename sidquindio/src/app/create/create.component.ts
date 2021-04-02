import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  spinner: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: [, Validators.required],
      img: ['', Validators.required],
      imgc1: ['', Validators.required],
      imgc2: ['', Validators.required],
      imgc3: ['', Validators.required],
      category: [, Validators.required],
      locate: [, Validators.required],
      description: ['', Validators.required]
  })
  }

  async onSubmit(){
    if (this.form.valid){
      let data ={
        name: this.form.value.name,
        type: this.form.value.type,
        img: this.form.value.img,
        imgc1: this.form.value.imgc1,
        imgc2: this.form.value.imgc2,
        imgc3: this.form.value.imgc3,
        category: this.form.value.category,
        locate: this.form.value.locate,
        description: this.form.value.description
      };
      console.log(data);
      Swal.fire({
        title: '???',
        text: "Seguro que desea crear",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Creado con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.spinner = false;
          this.client.postRequest(`${environment.BASE_API_REGISTER}/admin/add`, data).subscribe(
            (response: any) => {
              this.route.navigate( ['/paneladmin']);
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

    }else{
      Swal.fire('Rellene todos los campos')
    }
    
  }

}
