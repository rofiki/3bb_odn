<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\tbUsersDetail;
use Illuminate\Http\Request;
use Jerry\JWT\JWT;

class UsersDetailController extends Controller
{
    protected $tb = null;
    protected $tbUsersDetail = null;

    function __construct()
    {
        $this->tb = new tbUsersDetail;
    }

    public function getById($id)
    {
        $tb = $this->tb;

        try { 
            $item = $tb->where('users_detail_id', $id)->get()->first();
            if ($item) {
                $returnItems = array(
                    'profileId'=> $item['users_detail_id'],
                    'firstname'=> $item['users_detail_firstname'],
                    'lastname'=> $item['users_detail_lastname'],
                    'code'=> $item['users_detail_code'],
                    'createDate'=> $item['created_at'],
                    'updateDate'=> $item['updated_at'],
                    'image'=> $item['users_detail_image'],
                );

                return response()->json(['status' => true, 'limit' => 0, 'data' => $returnItems], 200);
            }else{
                return response()->json(['status' => false,]);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong!',], 500);
        }
    }


}
