<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\AuthController;


Route::post('/login', [AuthController::class, 'login']);


Route::get('/devices', [DeviceController::class, 'index']);       
Route::post('/devices', [DeviceController::class, 'store']);       
Route::patch('/devices/{id}/use', [DeviceController::class, 'toggleUse']); 

