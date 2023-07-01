import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenServicesService } from '../../services/token-services.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token:any = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenServicesService,
  ) {
    this.token = tokenService.getToken();
  }

  getInsumos(){
    return this.http.get<any>(`${this.apiUrl}/taer-insumos`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  createInsumos(data:any){
    return this.http.post<any>(`${this.apiUrl}/crear-insumo`, data, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  editInsumos(data:any){
    return this.http.post<any>(`${this.apiUrl}/editar-insumo`, data ,{
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  deletInsumos(data: any){
    return this.http.post<any>(`${this.apiUrl}/eliminar-insumo`, data, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
