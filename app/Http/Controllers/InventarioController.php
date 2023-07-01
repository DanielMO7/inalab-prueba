<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use Illuminate\Http\Request;

class InventarioController extends Controller
{
    public function taer_insumos(){
        $consulta = New Insumo();
        $respuesta = $consulta->traer_insumos();
        return $respuesta;
    }

    public function crear_insumo(Request $request){
        $consulta = New Insumo();
        $respuesta = $consulta->crearInsumo($request);
        return $respuesta;
    }

    public function editar_insumo(Request $request){
        $consulta = New Insumo();
        $respuesta = $consulta->editarInsumo($request);
        return $respuesta;
    }

    public function eliminar_insumo(Request $request){
        $consulta = New Insumo();
        $respuesta = $consulta->eliminarInsumo($request);
        return $respuesta;
    }




}
