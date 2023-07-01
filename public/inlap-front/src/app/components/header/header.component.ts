import { Component, EventEmitter, Output } from '@angular/core';
import { GeneralServicesService } from 'src/app/modules/services/general-services.service';
import { TokenServicesService } from 'src/app/modules/services/token-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() Loading = new EventEmitter();
  constructor(
    private authServices: GeneralServicesService,
    private tokenService: TokenServicesService
  ) {
    this.validarToken;
  }

  validarToken() {
    if (this.tokenService.isLoggedIn()) {
      return true;
    }
    return false;
  }

  cerrarSesion(): any {
    this.Loading.emit();
    this.authServices.cerrar_sesion().subscribe(
      (data) => {
        // status | 1 Todo salió correctamente.
        if (data.status == 1) {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: '¡Sesión Cerrada Correctamente!',
            showConfirmButton: false,
            timer: 1500,

          });
          this.Loading.emit();
        }
      },
      // error | Posibles errores que se pueden presentar.
      (error) => {
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Ah Ocurrido un error Inesperado!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.Loading.emit();
      }
    );
  }
}
