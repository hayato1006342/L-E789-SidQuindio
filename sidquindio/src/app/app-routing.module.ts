import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ContenidoComponent} from './contenido/contenido.component';
import { ContenidoHotelesComponent } from './contenido-hoteles/contenido-hoteles.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';

const routes: Routes = [
  {path:'', component: ContenidoComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegisterComponent},
  {path:'recover', component: RecoverComponent},
  {path:'hoteles', component: ContenidoHotelesComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
