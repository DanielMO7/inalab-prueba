<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\ErrorHandler\ThrowableUtils;

class Insumo extends Model
{
    use HasFactory;

    public function traer_insumos()
    {
        try {

            $insumos = Insumo::where('id_user', Auth::id())->get();

            return response()->json([
                "status" => 1,
                "msg" => "Insumos traidos correctamente",
                "data" => $insumos
            ]);
        } catch (ThrowableUtils $e) {
            return response()->json([
                "status" => 500,
                "msg" => "Error en base de datos",
                "data" => $e
            ], 500);
        }
    }

    public function crearInsumo($request)
    {
        $request->validate([
            'name' => 'required|string',
            'quantity' => 'required|numeric',
            'color' => 'required|string',
        ]);
        try {

            $insumo = new Insumo();

            $insumo->name = $request->name;
            $insumo->quantity = $request->quantity;
            $insumo->id_user = Auth::id();
            $insumo->color = $request->color;
            $insumo->save();

            return response()->json([
                "status" => 1,
                "msg" => "Insumo Creado Correctamente",
                "data" => $insumo
            ], 200);
        } catch (ThrowableUtils $e) {
            return response()->json([
                "status" => 500,
                "msg" => "Error en base de datos",
                "data" => $e
            ], 500);
        }
    }

    public function editarInsumo($request)
    {
        $request->validate([
            'id' => 'required|integer',
            'name' => 'required|string',
            'quantity' => 'required|numeric',
            'color' => 'required|string',
        ]);
        try {

            $insumo = Insumo::find($request->id);

            if ($insumo) {
                $insumo->name = $request->name;
                $insumo->quantity = $request->quantity;
                $insumo->id_user = Auth::id();
                $insumo->color = $request->color;

                $insumo->save();

                return response()->json([
                    "status" => 1,
                    "msg" => "Insumo Creado Correctamente",
                    "data" => $insumo
                ], 200);

            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "Insumo Desconocido",
                ], 403);
            }

        } catch (ThrowableUtils $e) {
            return response()->json([
                "status" => 500,
                "msg" => "Error en base de datos",
                "data" => $e
            ], 500);
        }
    }

    public function eliminarInsumo($request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        try {

            $insumo = Insumo::find($request->id);

            if ($insumo) {
                $insumo->delete();

                return response()->json([
                    "status" => 1,
                    "msg" => "Insumo Eliminado Correctamente",
                    "data" => $insumo
                ], 200);

            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "Insumo Desconocido",
                ], 403);
            }


        } catch (ThrowableUtils $e) {
            return response()->json([
                "status" => 500,
                "msg" => "Error en base de datos",
                "data" => $e
            ], 500);
        }
    }
}
