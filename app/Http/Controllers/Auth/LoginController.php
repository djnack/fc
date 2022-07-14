<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Auth\OTP;
use App\Models\Insurance;
use App\Models\Other\ConvertNumberToEnglish;
use App\Models\Other\ConvertPhoneNumberStandard;
use App\Models\User;
use App\Rules\PhoneNumberIsBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function Login(Request $req)
    {

        $this->validate($req, [
            'phone' => ['required', new PhoneNumberIsBlock],
            'password' => 'required | string',
        ]);

        $data = ConvertNumberToEnglish::ConvertAll($req->all());
        $phone = ConvertPhoneNumberStandard::Convert($data['phone']);



        if (Auth::attempt(['phone' => $phone, 'password' => $data['password']])) {
            $user = auth()->user();

            $otp = OTP::where('user_id', $user->id)->orderByDesc('id')->first();

            if ($otp) {
                if ($otp->try >= 10) {
                    $message = [
                        'status' => 401,
                        'errors' => ['phone' => __('auth.Blockedaccount')]
                    ];
                    return Response()->json($message, 401);
                } else if (!$otp->active) {
                    $message = [
                        'status' => 200,
                        'data' => ['next_page' => 'otp']
                    ];
                    return Response()->json($message, 200);
                }
            }

            $token = $user->createToken('***' . $phone . '***')->plainTextToken;

            $message = [
                'status' => 200,
                'data' => [
                    'token' => $token,
                    'next_page' => 'profile',
                    'part' => ''
                ]
            ];

            if (!$user->is_verify) {
                $message['data']['next_page'] = 'verify';
                $level = [1 => 'verify_personal', 2 => 'verify_insurance', 3 => 'verify_physical', 4 => ''];
                $message['data']['part'] = $level[$user->level_verify];
                return Response()->json($message, 200);
            }
            return Response()->json($message, 200);
        } else {
            $message = [
                'status' => 401,
                'errors' => ['phone' => __('auth.failedphone')]
            ];
            return Response()->json($message, 401);
        }
    }
}
