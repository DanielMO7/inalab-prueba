import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { InsumosComponent } from './modules/insumos/insumos.component';
import { CrudInsumosComponent } from './modules/insumos/components/crud-insumos/crud-insumos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PerfilComponent,
    InsumosComponent,
    CrudInsumosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
