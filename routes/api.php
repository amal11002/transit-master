<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\DossierController;
use App\Http\Controllers\FichierController;

//register
Route::post('inscription', [ApiController::class, 'inscription']);

//login
Route::post("connexion", [ApiController::class, "connexion"]);

Route::middleware('auth:sanctum')->get('check-admin', [ApiController::class, 'checkAdmin']);
Route::middleware('auth:sanctum')->get('check-roleanddepartement', [ApiController::class, 'checkUserRoleAndDepartment']);
Route::middleware('auth:sanctum')->get('verify-token', [ApiController::class, 'verifyToken']);

//log
Route::middleware('auth:sanctum')->group(function (){
    //profile
    Route::get("profile",[ApiController::class,"profile"]);

    //logout
    Route::get("logout",[ApiController::class,"logout"]);

});
Route::get('users/{id}', [ApiController::class, 'getUserDetails']);
 // Admin routes
 Route::middleware('auth:sanctum')->group(function () {

    Route::get('users', [ApiController::class, 'listUsers']);
    Route::post('users', [ApiController::class, 'createUser']);
    Route::put('users/{id}', [ApiController::class, 'updateUser']);
    Route::delete('users/{id}', [ApiController::class, 'deleteUser']);

});

// Update user's departement
Route::put('users/{id}/update-departement', [ApiController::class, 'updateUserDepartement']);

// Update user's role
Route::put('users/{id}/update-role', [ApiController::class, 'updateUserRole']);

// Role and departement routes
Route::get('/role', [RoleController::class, 'index']);
Route::get('/departement', [DepartementController::class, 'index']);
Route::get('/get-token', [ApiController::class, 'getToken']);

Route::post('/dossiers', [DossierController::class, 'store']);
Route::post('/fichiers', [FichierController::class, 'store']);
Route::get('/dossiers', [DossierController::class, 'index']);
Route::get('/dossiers/{id}', [DossierController::class, 'show']);
Route::put('/dossiers/{id}', [DossierController::class, 'update']);
Route::delete('/dossiers/{id}', [DossierController::class, 'destroy']);

