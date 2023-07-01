import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InsumosService } from './services/insumos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss'],
})
export class InsumosComponent {
  insumo_user: any = [];

  openCrudInsumo: boolean = false;
  opcionCrud: number = 1;
  insumoAccion: any = [];

  @Output() cerrarCrudPadre = new EventEmitter<void>();
  @Output() actualizarArraydPadre = new EventEmitter<void>();

  constructor(private insumoService: InsumosService) {
    this.insumoService.getInsumos().subscribe(
      (data) => {
        if (data.status == 1) {
          this.insumo_user = data.data;
          console.log(data.data);
        }
      },
      (error) => {
        console.log('error en db: ', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ah Ocurrido un Error Interno!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  abrirEditarInsumo(insumo: any) {
    this.openCrudInsumo = true;
    this.opcionCrud = 2;
    this.insumoAccion = insumo;
  }

  abrirCrearInsumo() {
    this.openCrudInsumo = true;
    this.opcionCrud = 1;
    this.insumoAccion = [];
  }

  eliminarInsumo(id: number) {
    Swal.fire({
      title: '¿Estás Seguro de que desea eliminar el Insumo?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#3085d6',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.insumoService.deletInsumos({ id: id }).subscribe(
          (data) => {
            if (data.status == 1) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Elemento Eliminado Correctamente!',
                showConfirmButton: false,
                timer: 1500,
              });
              const indice = this.insumo_user.findIndex((item:any) => item.id === id);
              if (indice !== -1) {
                this.insumo_user.splice(indice, 1);
              }
            }
          },
          (error) => {
            console.log(error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ah Ocurrido un Error Interno!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

  actualizarArrayInsumos(data: any) {
    const elementoEncontrado = this.insumo_user.filter(
      (item: any) => item.id === data.id
    );
    if (elementoEncontrado.length > 0) {
      for (let i = 0; i < this.insumo_user.length; i++) {
        if (this.insumo_user[i].id === data.id) {
          this.insumo_user[i] = data;
          break;
        }
      }
    } else {
      this.insumo_user.push(data);
    }
  }

  cerrarCrud() {
    this.openCrudInsumo = !this.openCrudInsumo;
  }
}
