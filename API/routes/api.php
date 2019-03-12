<?php

use Illuminate\Http\Request;

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

Route::group(['middleware' => 'jwt.auth'], function() {
    Route::get('auth/me', 'Api\AuthController@authenticate');
    Route::get('auth/logout', 'Api\AuthController@logout');
    Route::post('auth/editUser', 'Api\AuthController@editUser');
    Route::post('auth/changePassword', 'Api\AuthController@changePassword');
    Route::resource('/favorites', 'FavoriteController');
    Route::post('/removeFavorite', 'FavoriteController@removeFavorite');
    Route::resource('/rates', 'RateController');
    Route::post('places', 'PlacesController@list');
    Route::post('placeDetail', 'PlacesController@Detail');
});

Route::post('auth/login', 'Api\AuthController@authenticate');
Route::post('auth/loginFacebook', 'Api\AuthController@authenticateFacebook');
Route::post('auth/register', 'Api\AuthController@register');
Route::post('auth/recovery', 'Api\AuthController@recoveryPassword');
