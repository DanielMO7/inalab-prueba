<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventarioController;
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
    Route::get('/user', 'user');
});

Route::middleware(['auth:sanctum'])->controller(InventarioController::class)->group(function () {
    Route::get('/taer-insumos', 'taer_insumos');
    Route::post('/crear-insumo', 'crear_insumo');
    Route::post('/editar-insumo', 'editar_insumo');
    Route::post('/eliminar-insumo', 'eliminar_insumo');


});

