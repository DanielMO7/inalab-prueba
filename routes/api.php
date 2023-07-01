<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('sign-up',  'sign_up');
});

Route::middleware(['auth:sanctum'])->controller(AuthController::class)->group(function () {
    Route::post('cerrar-sesion', 'cerrar_sesion');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        "status" => 0,
        "msg" => "Acerca del perfil del usuario",
        "data" => $request->user()
    ]);
});
