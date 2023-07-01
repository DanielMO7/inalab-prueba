import { Injectable } from '@angular/core';
import { catchError, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenServicesService } from './token-services.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GeneralServicesService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient,
    private tokenService: TokenServicesService,
    private route: Router
  ) {}

  login(user: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      switchMap((response) => {
        if (response.status == 1) {

          this.tokenService.setToken(
            response.access_token,
          );

          const token = this.tokenService.getToken(); // Obtiene el token que se acaba de crear.
          // Se realiza una petición para recibir la información del perfil de usuario que se creó
          return this.http
            .get<any>(`${this.apiUrl}/user`, {
              headers: {
                Authorization: `Bearer ${token}`, // Se asigna el token de autorización Bearer, ya que es una ruta protegida.
              },
            })
            .pipe(
              tap((responsePerfil) => {
                // status | 0 Todo salió correctamente.
                if (responsePerfil.status == 0) {
                  // Guarda la información recibida del usuario en una variable del localStorage.
                  const value = this.tokenService.guardarPerfil(
                    responsePerfil.data // responsePerfil.data | Información del perfil de usuario.
                  );
                  this.route.navigate(['/home']);
                }
              })
            );
        } else {
          // Si el status no es igual a 1, retorna la respuesta original.
          return of(response);
        }
      })
    );
  }
  register(user: any) {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, user).pipe(
      tap((response) => {
        if (response.status == 1) {
          // status | 1 Todo salió correctamente.
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Registro Realizado Correctamente!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        this.route.navigate(['/login']); // Envía al usuario al módulo de logueo.
      })
    );
  }

  cerrar_sesion() {
    // Válida si el usuario está logueado.
    if (!this.tokenService.isLoggedIn()) {
      return of({ error: 'No hay un token de sesión válido' });
    }
    const token = this.tokenService.getToken(); // Obtiene el token del usuario.
    return this.http
      .post<any>(`${this.apiUrl}/cerrar-sesion`, null, {
        headers: {
          Authorization: `Bearer ${token}`, // Token de autenticación a ruta protegida.
        },
      })
      .pipe(
        tap((response) => {
          // status | 1 Todo salio correctamente
          if (response.status == 1) {
            this.tokenService.deleteToken(); // Elimina el token de las cookies.
            this.tokenService.eliminarPerfil(); // Elimina el perfil del usuario del localStorage.
            this.route.navigate(['/login']); // Retorna al usuario al login.
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          // Si se retorna un 401 significa que el token del usuario no funciona, entonces se elimina
          if (error.status == 401) {
            this.tokenService.deleteToken(); // Elimina el token de las cookies.
            this.tokenService.eliminarPerfil(); // Elimina el perfil del usuario del localStorage.
            this.route.navigate(['/login']); // Retorna al usuario al login.
          }
          return of({ error: 'Ha ocurrido un error al cerrar sesión' });
        })
      );
  }
}
