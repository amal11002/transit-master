<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\DepartementController;

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



// Route::middleware(['auth', 'user-access:user'])->group(function () {
//     Route::get('/user', [ApiController::class, 'user']);
// });

// Route::middleware(['auth', 'user-access:admin'])->group(function () {
//     Route::get('/admin', [ApiController::class, 'admin']);
// });

// Route::middleware(['auth', 'user-access:manager'])->group(function () {
//     Route::get('/manager', [ApiController::class, 'manager']);
// });

