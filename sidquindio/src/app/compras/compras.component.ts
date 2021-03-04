import { Component, OnInit} from '@angular/core';
import { BuyService } from '../buy.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(public buy: BuyService) { }

  data:any;

  ngOnInit(): void {
    this.buy.subject.subscribe(response => this.data = response);
  }

}
