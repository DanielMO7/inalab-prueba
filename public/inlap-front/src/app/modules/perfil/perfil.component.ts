import { Component } from '@angular/core';
import { GeneralServicesService } from '../services/general-services.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  usuario: any = [];
  constructor(){
    const jsonString = localStorage.getItem('perfil_user');
    this.usuario = jsonString ? JSON.parse(jsonString) : null;
    console.log(this.usuario);

  }
}
