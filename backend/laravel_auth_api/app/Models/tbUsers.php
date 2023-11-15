<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbUsers extends Model
{
    use HasFactory;

    protected $table = 'tb_users';
    protected $primaryKey = 'users_id';

    protected $fillable = [ 
        'users_usersname',
        'users_password',
        'users_role',
        'provider',
        'salt',
        'isActive',
        'users_gg_id',
        // 'users_detail_id'
    ];   

    // public $timestamps = false;
}
