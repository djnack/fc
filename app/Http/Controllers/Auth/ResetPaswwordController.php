<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Other\ConvertNumberToEnglish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ResetPaswwordController extends Controller
{
    public function ResetPassword(Request $req)
    {
        $this->validate($req, [
            'password' => 'required | string | min:8 | confirmed',
        ]);

        $data = ConvertNumberToEnglish::ConvertAll($req->all());


        auth()->user()->password = Hash::make($data['password']);
        auth()->user()->save();

        $message = [
            'status' => 201,
            'data' => ['password' => __('auth.updatepassword')]
        ];
        $user = auth()->user();
        $level = [1 => 'verify_personal', 2 => 'verify_insurance', 3 => 'verify_physical', 4 => ''];

        $message['data']['next_page'] = $user->is_verify ? 'profile' : 'verify';
        $message['data']['part'] = $level[$user->level_verify];


        return Response()->json($message, 201);
    }
}
