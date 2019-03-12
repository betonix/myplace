<?php

namespace App\Http\Controllers;

use App\Favorite;
use App\Rate;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
class PlacesController extends Controller
{
    public function list(Favorite $farovite, Request $request)
    {       

        $client = new Client();
        $profileResponse = $client->request('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json', [
        'query' => [
            'location' => $request->input('lat').','.$request->input('lng'),
            'radius' => $request->input('radius'),
            'type' => $request->input('type'),
            'key' => 'AIzaSyA47jJdht6eK4qGqiTaBY6uypZHYHuZnH0',
     
        ]
        ]);
    
        $places = $profileResponse->getBody()->getContents();
        $places= json_decode($places, true);
        return response()->json(compact('places'));  
    }

    public function detail(Favorite $farovite, Request $request,Rate $rate)
    {       
        $fields = 'name,id,place_id,geometry,formatted_address,photo';
        $client = new Client();
        $profileResponse = $client->request('GET', 'https://maps.googleapis.com/maps/api/place/details/json', [
        
        'query' => [
            'placeid' => $request->input('place_id'),
            'fields' =>  $fields,
            'key' => 'AIzaSyA47jJdht6eK4qGqiTaBY6uypZHYHuZnH0',
        ]
        ]);
    
        $place = $profileResponse->getBody()->getContents();
        $place = json_decode($place, true);
        $place['isfavorite'] = false;

        $isFavorite =  $farovite->where([
            'place_id' => $request->input('place_id'), 
            'user_id' => $request->input('user_id'), 
            'status' => 0])
            ->first();

        if(isset($isFavorite)){
            $place['isfavorite'] = true;
        }

        $place['reviews'] = $rate->with('user')
            ->where('place_id', $request->input('place_id'))->get();

        return response()->json(compact('place'));  
    }

}
