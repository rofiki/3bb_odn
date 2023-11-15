<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbUsersDetail extends Model
{
    use HasFactory;

    protected $table = 'tb_users_detail';
    protected $primaryKey = 'users_detail_id';

    protected $fillable = [ 
        'users_detail_firstname',
        'users_detail_lastname',
        'users_detail_code',
        'users_detail_image',
        'users_id'
    ];   

    // public $timestamps = false;
}
