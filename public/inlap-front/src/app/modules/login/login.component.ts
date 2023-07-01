import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GeneralServicesService } from '../services/general-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin: FormGroup;
  submitted: boolean = false;

  loadingLogin: boolean = false;

  contrasenaInvalida: boolean = false;
  correoInvalido: boolean = false;

  constructor(
    private form_login: FormBuilder,
    private authServices: GeneralServicesService,
    public route: Router
  ) {
    this.formLogin = this.form_login.group({
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
    });
  }

  iniciarSesion() {
    if (this.formLogin.valid) {
      this.loadingLogin = true;
      this.authServices.login(this.formLogin.value).subscribe(
        (data) => {
          // status | 0: Todo salió correctamente.
          if (data.status == 0) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Bienvenido!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.route.navigate(['/home']);
            this.loadingLogin = false;
          }
        },
        (error) => {
          // status | 402: Contraseña incorrecta.
          if (error.status === 402) {
            this.contrasenaInvalida = true;
            setTimeout(() => {
              this.contrasenaInvalida = false;
            }, 3000);

            // status | 403: Correo electronico incorrecto.
          } else if (error.status === 403) {
            this.correoInvalido = true;
            setTimeout(() => {
              this.correoInvalido = false;
            }, 3000);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ah ocurrido un problema interno!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.loadingLogin = false;
        }
      );
    }
  }
  clasesInputErroneo(controlName: string) {
    const control = this.formLogin.get(controlName);

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
