import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GeneralServicesService } from '../services/general-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  formularioRegistro: FormGroup;
  submitted: boolean = false;

  loadingRegister: boolean = false;

  contrasenaInvalida: boolean = false;
  correoInvalido: boolean = false;

  constructor(
    private form_login: FormBuilder,
    private authServices: GeneralServicesService,
    public route: Router
  ) {
    this.formularioRegistro = this.form_login.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([\\w-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([\\w-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
          ),
        ],
      ],
      password: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    });
  }

  registrarUsuario(): any {
    if (this.formularioRegistro.valid) {
      this.loadingRegister = true;
      this.authServices.register(this.formularioRegistro.value).subscribe(
        (data) => {
          // status | 1 Todo Salió Correctamente.
          if (data.status == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Usuario Registrado Correctamente!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.loadingRegister = false;
            this.route.navigate(['/login']);
          }
        },
        (error) => {
          // status | 500 Error en Consulta Base de datos.
          if (error.status == 500) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Error en Base de Datos!',
              showConfirmButton: false,
              timer: 1500,
            });
            // status | 422 Información del formulario errónea.
          } else if (error.status == 422) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title:
                'Parece que la información ingresada es errónea, verifícala',
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            console.log(error);
          }
          this.loadingRegister = false;
        }
      );
    }
  }

  clasesInputErroneo(controlName: string) {
    const control = this.formularioRegistro.get(controlName);

    // Se verifica si la etiqueta es inválida y si fue tocada fuera del input. También sí, la etiqueta
    // es inválida y el formulario fue envido, esto se hace verificando la variable submitted.
    if (
      (control?.invalid && control.touched) ||
      (control?.invalid && this.submitted)
    ) {
      return {
        'border-2': true,
        'border-red-500': true,
        'text-red-600': true,
        'focus:ring-0': true,
        'opacity-100': false,
      };
    }

    return {};
  }
}
