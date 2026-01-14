<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Device extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'location',
        'purchase_date',
        'in_use',
        'user_id',
    ];

    protected $casts = [
        'in_use' => 'boolean',
        'purchase_date' => 'date',
    ];
}

