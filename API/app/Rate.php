<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    protected $fillable = [
        'place_id', 'user_id', 'comments', 'rate'
    ];

    public function User(){
        return $this->belongsTo(User::class);
    }
}
