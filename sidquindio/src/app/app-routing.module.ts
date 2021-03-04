import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ContenidoComponent} from './contenido/contenido.component';
import { ContenidoHotelesComponent } from './contenido-hoteles/contenido-hoteles.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { DetallesComponent } from './detalles/detalles.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { CreateComponent } from './create/create.component';
import { HistorialCompraComponent } from './historial-compra/historial-compra.component';
import { ComprasComponent } from './compras/compras.component';

const routes: Routes = [
  {path:'', component: ContenidoComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegisterComponent},
  {path:'recover', component: RecoverComponent},
  {path:'hoteles', component: ContenidoHotelesComponent},
  {path:'detalles', component: DetallesComponent},
  {path:'crear', component: CreateComponent},
  {path:'paneladmin', component: PanelAdminComponent},
  {path:'historial', component: HistorialCompraComponent},
  {path:'compras', component: ComprasComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
