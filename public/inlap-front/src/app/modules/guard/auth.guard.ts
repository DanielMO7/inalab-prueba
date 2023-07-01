import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenServicesService } from '../services/token-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenServices: TokenServicesService) {}
  /**
   * Este es un guardia que permite verifica si existe un token de autenticación y si no es así no
   * Permitirá que el usuario acceda a la ruta en el que este se encuentre implementado y lo retornara.
   *
   * Este guardia está implementado para que un usuario registrado no acceda a las rutas de Auth y de
   * registro, ya que a estas rutas no se debe acceder si ya se encuentra autenticado.
   * @param route
   * @param state
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenServices.getToken(); // Obtiene el token.

    // Verifica si exite.
    if (token) {
      // El usuario está logueado y tiene un token en el LocalStorage
      this.router.navigate(['/home']);
      return false;
    } else {
      // El usuario no está logueado, redireccionar a la página de login
      return true;
    }
  }

}
