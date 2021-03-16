import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators,  } from '@angular/forms';
import { BuyService } from '../buy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(public buy: BuyService,
    private route: Router,
    private fb: FormBuilder) { }

  data:any;
  code = Math.floor((Math.random() * 99999999) + 1);
  form: FormGroup;

  async myFormulario(){
    this.form = this.fb.group({
      name: [ {value: this.data['name'][0].name, disabled: true},Validators.required],
      locate: [{value: "Quindio", disabled: true},Validators.required],
      code: [ {value: this.code, disabled: true},Validators.required ],
      amount : [ {value: this.data.cantidad, disabled: true},Validators.required],
      value : [ {value: this.data.opcion * this.data.cantidad, disabled: true},Validators.required],
      date : [{value: "2020-05-02", disabled:true},Validators.required]
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
    let data ={
        name: this.form.value.name,
        locate : this.form.value.locate,
        code: this.form.value.code,
        amount: this.form.value.amount,
        value: this.form.value.value,
        date: this.form.value.date
      };
      console.log(data)
  }
}
