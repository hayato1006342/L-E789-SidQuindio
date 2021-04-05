import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { ContenidoHotelesComponent } from './contenido-hoteles/contenido-hoteles.component';
import { DetallesComponent } from './detalles/detalles.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { CreateComponent } from './create/create.component';
import { HistorialCompraComponent } from './historial-compra/historial-compra.component';
import { ComprasComponent } from './compras/compras.component';
import { RecoverEmailComponent } from './recover-email/recover-email.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ContenidoComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    CreateComponent,
    ContenidoHotelesComponent,
    DetallesComponent,
    PanelAdminComponent,
    HistorialCompraComponent,
    ComprasComponent,
    RecoverEmailComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
