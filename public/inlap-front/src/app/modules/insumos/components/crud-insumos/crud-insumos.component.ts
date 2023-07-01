import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsumosService } from '../../services/insumos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-insumos',
  templateUrl: './crud-insumos.component.html',
  styleUrls: ['./crud-insumos.component.scss'],
})
export class CrudInsumosComponent implements OnInit {
  @Input() opcionCrud!: number;
  @Input() insumoAccion: any | null = null;

  @Output() cerrarCrudPadre = new EventEmitter<void>();
  @Output() actualizarArraydPadre = new EventEmitter<void>();

  submitted: boolean = false;
  formCrearInsumo: FormGroup;

  formEditarInsumo: FormGroup;

  loading: boolean = false;

  constructor(
    private form_crear_insumo: FormBuilder,
    private form_editar_insumo: FormBuilder,
    private insumoService: InsumosService
  ) {
    this.formCrearInsumo = this.form_crear_insumo.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      color: ['', Validators.required],
    });
    this.formEditarInsumo = this.form_editar_insumo.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.formEditarInsumo = this.form_editar_insumo.group({
      id: [this.insumoAccion.id, Validators.required],
      name: [this.insumoAccion.name, Validators.required],
      quantity: [this.insumoAccion.quantity, Validators.required],
      color: [this.insumoAccion.color, Validators.required],
    });
  }

  crearInsumo() {
    if(this.formCrearInsumo.valid){
      this.loading = true;
      this.insumoService.createInsumos(this.formCrearInsumo.value).subscribe((data)=> {
        if(data.status == 1){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Insumo Creado Correctamente!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.actualizarArraydPadre.emit(data.data);
          this.cerrarCrudPadre.emit();
          this.loading = false;
        }
      }, (error) => {
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ah Ocurrido un Error Interno!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
    }
  }

  editarInsumo() {
    if(this.formEditarInsumo.valid){
      this.loading = true;
      this.insumoService.editInsumos(this.formEditarInsumo.value).subscribe((data)=> {
        if(data.status == 1){
          if(data.status == 1){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Insumo Editado Correctamente!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.actualizarArraydPadre.emit(data.data);
            this.cerrarCrudPadre.emit();
            this.loading = false;
          }
        }
      }, (error) => {
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ah Ocurrido un Error Interno!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
    }
  }

  clasesInputErroneo(controlName: string) {
    const control =
      this.opcionCrud == 1
        ? this.formCrearInsumo.get(controlName)
        : this.formEditarInsumo.get(controlName);

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

  validarFormulario() {
    if (this.opcionCrud == 1) {
      return this.formCrearInsumo;
    } else {
      return this.formEditarInsumo;
    }
  }

  cerrarCrud() {
    this.cerrarCrudPadre.emit();
  }
}
