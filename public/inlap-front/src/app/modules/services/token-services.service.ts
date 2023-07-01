import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenServicesService {
// Token del Usuario
private token?: string;

constructor(private cookieService: CookieService) {
  // Obtiene el token desde el Service CookieService el cual se encarga de manipularlo.
  const token = this.cookieService.get('token');
  if (token) {
    this.token = token;
  }
}

/**
 * Invoca la funcion set del service cookieService que permite crear una cookie la cual almacenara
 * el token y le asignara un tiempo de vida.
 * @param token | Valor del Token recivido como parametro.
 * @param time | Tiempo de vida del token
 * @returns boolean
 */
setToken(token: string) {
  const expirationSeconds = 3600;
  this.cookieService.set('token', token, expirationSeconds, '/', '', true, 'Lax');
  this.token = token;
  return true;
}

/**
 * Retorna el token que se encuentra almacenado en el servicio.
 * @returns string
 */
getToken() {
  return this.token;
}

/**
 * Verifica si existe un token válido.
 * @returns boolean
 */
isLoggedIn() {
  return !!this.token;
}

/**
 * Elimina el token que se encuentra en la cookie 'token'.
 * @returns boolean
 */
deleteToken() {
  this.cookieService.delete('token');
  this.token = '';

  return true;
}

/**
 * Crea En el local Storage un array que contiene la información del usuario.
 * @param data | Objeto
 * @returns boolean
 */
guardarPerfil(data: any) {
  localStorage.setItem('perfil_user', JSON.stringify(data));
  return true;
}

/**
 * Elimina del local Storage la información que se tiene del usuario.
 * @returns boolean
 */
eliminarPerfil() {
  localStorage.removeItem('perfil_user');
  return true;
}
}
