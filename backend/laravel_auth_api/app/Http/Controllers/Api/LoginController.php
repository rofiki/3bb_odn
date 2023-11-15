<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\tbLogin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Jerry\JWT\JWT;

class LoginController extends Controller
{
    protected $tb = null;
    protected $tbUsersDetail = null;

    function __construct()
    {
        $this->tb = new tbLogin;
    }

    public function create(Request $request)
    {

        // return response()->json(['request' => $request->users_detail_id]);

        $create = $this->tb->create([
            'users_detail_id' => $request->users_detail_id,
            'tokenLog' => $request->tokenLog,
            'login_datetime' => date('Y-m-d H:i:s'),
            'login_pcname' => null,
            'login_ip' => $request->login_ip,
            'isLogin' => $request->isLogin,
            'logout_datetime' => null,
            'login_email' => $request->login_email,
        ]);

        if ($create) {
            return response()->json([
                'status' => true,
                'email' => $create->login_email,
                'message' => 'Created Successfully',
            ], 200);
        } else {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong!',], 500);
        }
    }

    public function createToken(Request $request)
    {
        try {
            $item = DB::table('tb_users')
                ->leftJoin('tb_users_detail', 'tb_users.users_id', '=', 'tb_users_detail.users_id')
                ->where('users_usersname', $request->email)->get()->first();

            if ($item) {
                $payload = array(
                    'users_id' => $item->users_id,
                    'email' => $item->users_usersname,
                    'role' => $item->users_role,
                    'provider' => $item->provider,
                    'isActive' => $item->isActive,
                    'users_detail_id' => $item->users_detail_id,
                    'firstname' => $item->users_detail_firstname,
                    'lastname' => $item->users_detail_lastname,
                    'loginDate' => date("Y-m-d H:i:s"),
                );
                $token = JWT::encode($payload);
                return response()->json(['status' => true,'token' => $token], 200);
            } else {
                return response()->json(['status' => false,'token' => null]);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong!',], 500);
        }

    }

}
