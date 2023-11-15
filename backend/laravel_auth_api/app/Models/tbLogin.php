<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbLogin extends Model
{
    use HasFactory;

    protected $table = 'tb_login';
    protected $primaryKey = 'login_id';

    protected $fillable = [ 
        'users_detail_id',
        'tokenLog',
        'login_datetime',
        'login_pcname',
        'login_ip',
        'isLogin',
        'logout_datetime',
        'login_email'
    ];   

    public $timestamps = false;
}
