<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function sign_up(Request $request){
        try {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required',
            ]);

            try {
                // Inserta los campos recibidos en la base de datos.
                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->save();

                return response()->json([
                    "status" => 1,
                    "msg" => "Registro de usuario exitoso!",
                ], 200);
            } catch (QueryException $e) {
                return response()->json([
                    'status' => 2,
                    'msg' => 'Error en consulta eloquent',
                    'data' => $e->getMessage()
                ], 500);
            }
        } catch (ValidationException $e) {
            // Si ocurre un error de validación, retorna una respuesta con los errores
            return response()->json(['errors' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where("email", "=", $request->email)->first();
        if (isset($user->id)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken("auth_token")->plainTextToken;
                return response()->json([
                    "status" => 1,
                    "msg" => "Usuario logueado exitosamente.",
                    "access_token"  => $token
                ], 200);
            } else {
                // 401 No Autorizado
                return response()->json([
                    "status" => 0,
                    "msg" => "La contraseña es incorrecta!",
                ], 402);
            }
        } else {
            // 403 El acceso a ese recurso está prohibido
            return response()->json([
                "status" => 2,
                "msg" => "Usuario no registrado!",
            ], 403);
        }
    }

    public function cerrar_sesion(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "status" => 1,
            "msg" => "Sesión Cerrada"
        ], 200);
    }

}
