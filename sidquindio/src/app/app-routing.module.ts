import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContenidoComponent} from './contenido/contenido.component';
const routes: Routes = [
  {path:'', component: ContenidoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
