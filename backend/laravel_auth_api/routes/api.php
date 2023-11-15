<?php

use App\Http\Controllers\Api\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\UsersDetailController;

use Jerry\JWT\JWT;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {

    $payload = [
        "users_id"=>1,
        "firstname"=>'Rofiki Harong i love suraida taleh'
    ];

    $token = JWT::encode($payload);

    return $token;
});

Route::prefix('users')->group(function () {
    Route::get('/', [UsersController::class, 'index']);  
    Route::get('/{id}',[UsersController::class, 'getById']);
    Route::get('/email/{email}',[UsersController::class, 'getByEmail']);
    Route::get('/token/{id}',[UsersController::class, 'getByToken']);
    //Route::get('/',[UserController::class, 'gets']); // ค้นหา

    Route::post('/',[UsersController::class, 'create']);
    Route::post('/register-google',[UsersController::class, 'createByGoogle']);
    Route::put('/{id}', [UsersController::class, 'update']);  
    Route::delete('/{id}', [UsersController::class, 'delete']); 
    Route::post('/login', [UsersController::class, 'loginProcess']);      
});

Route::prefix('users-detail')->group(function () {
    Route::get('/', [UsersDetailController::class, 'index']);  
    Route::get('/{id}',[UsersDetailController::class, 'getById']);
});

Route::prefix('login')->group(function () {
    Route::get('/', [LoginController::class, 'index']);  
    Route::get('/{id}',[LoginController::class, 'getById']);
    Route::post('/',[LoginController::class, 'create']);
});

Route::prefix('createtoken')->group(function () {
    Route::post('/', [LoginController::class, 'createToken']);  
});
