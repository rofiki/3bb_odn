<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use App\Models\tbUsers;
use App\Models\tbUsersDetail;
use Illuminate\Support\Facades\DB;

use Jerry\JWT\JWT;

class UsersController extends Controller
{
    protected $tb = null;
    protected $tbUsersDetail = null;

    function __construct()
    {
        $this->tb = new tbUsers;
        $this->tbUsersDetail = new tbUsersDetail;
    }

    public function create(Request $request)
    {
        $isActive = 2;
        $provider = 'WEB';
        $role = 'user';
        $salt = date('YmdHis');

        $validator = Validator::make($request->all(), [
            'users_usersname' => 'required|max:200',
            'users_password' => 'required|max:200',
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 422, 'error' => $validator->messages(),], 422);
        } else {

            // gen password
            $new_password = md5($request->users_password . $salt);

            $create = $this->tb->create([
                'users_usersname' => $request->users_usersname,
                'users_password' => $new_password,
                'users_role' => $role,
                'provider' => $provider,
                'salt' => $salt,
                'isActive' => $isActive,
                'users_gg_id' => '',
            ]);

            if ($create) {
                $this->tbUsersDetail->create([
                    'users_detail_firstname' => $request->users_detail_firstname,
                    'users_detail_lastname' => $request->users_detail_lastname,
                    'users_detail_code' => null,
                    'users_detail_image' => null,
                    'users_id' => $create->users_id,
                ]);
                return response()->json([
                    'status' => true,
                    'email' => $request->users_usersname,
                    'message' => 'Created Successfully',
                ], 200);
            } else {
                return response()->json(['status' => false, 'message' => 'Something Went Wrong!',], 500);
            }
        }
    }

    public function createByGoogle(Request $request)
    {
        $isActive = 2;
        $provider = 'GOOGLE';
        $role = 'user';
        $salt = date('YmdHis');

        $validator = Validator::make($request->all(), [
            'users_usersname' => 'required|max:200',
            'users_gg_id' => 'required|max:200',
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 422, 'error' => $validator->messages(),], 422);
        } else {

            $create = $this->tb->create([
                'users_usersname' => $request->users_usersname,
                'users_password' => $request->users_password,
                'users_role' => $role,
                'provider' => $provider,
                'salt' => $salt,
                'isActive' => $isActive,
                'users_gg_id' => $request->users_gg_id,
            ]);

            if ($create) {
                $this->tbUsersDetail->create([
                    'users_detail_firstname' => $request->users_detail_firstname,
                    'users_detail_lastname' => $request->users_detail_lastname,
                    'users_id' => $create->users_id,
                ]);
                return response()->json([
                    'status' => true,
                    'email' => $request->users_usersname,
                    'message' => 'Created Successfully',
                ], 200);
            } else {
                return response()->json(['status' => false, 'message' => 'Something Went Wrong!',], 500);
            }
        }
    }

    public function getByEmail($email)
    {
        $tb = $this->tb;

        try {
            $item = $this->tb->leftJoin('tb_users_detail', 'tb_users.users_id', '=', 'tb_users_detail.users_id')
                ->where('users_usersname', $email)->get()->first();
            if ($item) {
                $returnItems = array(
                    'email' => $item->users_usersname,
                    'role' => $item->users_role,
                    'loginProvider' => $item->provider,
                    'isActive' => $item->isActive,
                    'infoId' => $item->users_detail_id,
                    // 'uid'=> $item['users_id'],
                );
                return response()->json(['status' => true, 'limit' => 0, 'data' => $returnItems,], 200);
            } else {
                return response()->json(['status' => false,]);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong!',], 500);
        }
    }

    public function loginProcess(Request $request)
    {
        $users_usersname = $request->users_usersname;
        $users_password = $request->users_password;
        $provider = 'WEB';
        $status = false;

        try {
            $checkUser = DB::table('tb_users')
                ->leftJoin('tb_users_detail', 'tb_users.users_id', '=', 'tb_users_detail.users_id')
                ->where('users_usersname', $users_usersname)->get()->first();
                
            if($checkUser){

                $password = md5($users_password . $checkUser->salt);
                $checkPass = $this->tb
                    ->where('users_usersname', $users_usersname)
                    ->where('users_password', $password)->get()->first();

                if($checkPass)
                {
                    if($checkUser->isActive == 0){ // ระงับ
                        return response()->json(['status' => false,'message' => 'อีเมล์นี้ ถูกระงับการใช้งาน!! กรุณาติดต่อผู้ดูแลระบบ','log' => 1], 403);
                    }elseif($checkUser->isActive == 2){ // รออนุมัติ
                        return response()->json(['status' => false,'message' => 'อีเมล์นี้ กำลังรออนุมัติ จากผู้ดูแลระบบ','log' => 1], 403);
                    }elseif($checkUser->isActive == 1){ 

                        $payload = array(
                            'users_id' => $checkUser->users_id,
                            'email' => $checkUser->users_usersname,
                            'role' => $checkUser->users_role,
                            'provider' => $checkUser->provider,
                            'isActive' => $checkUser->isActive,
                            'users_detail_id' => $checkUser->users_detail_id,
                            'firstname' => $checkUser->users_detail_firstname,
                            'lastname' => $checkUser->users_detail_lastname,
                            'loginDate' => date("Y-m-d H:i:s"),
                        );
                        $token = JWT::encode($payload);
                        return response()->json(['status' => true,'token' => $token,'message' => 'เข้าสู่ระบบ สำเร็จ!!'], 200);
                    }

                }else{
                    return response()->json(['status' => false,'log' => 2]);
                }           
            } else{
                return response()->json(['status' => false,'log' => 3]);
            }

        } catch (\Exception $e) {
            return response()->json(['status' => false,'log' => 4, 'message' => 'Something Went Wrong!',], 500);
        }

    }
}
