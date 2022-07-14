<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Other\ConvertNumberToEnglish;
use App\Models\Other\ConvertPhoneNumberStandard;
use App\Models\User;
use App\Rules\PhoneNumber;
use Illuminate\Http\Request;

class OTPController extends Controller
{
    public function OTP(Request $req)
    {
        $this->validate($req, [
            'phone' => ['required', new PhoneNumber],
            'code' => 'required | string | min:6| max:6 ',
        ]);

        $this->validate($req, [
            'code' => 'numeric',
        ]);


        $data = ConvertNumberToEnglish::ConvertAll($req->all());
        $phone = ConvertPhoneNumberStandard::Convert($data['phone']);

        $user = User::wherePhone($phone)->with('getOTP')->first();
        if ($user && count($user->getOTP) && !$user->getOTP[0]->active) {
            $try = 0;
            if ($user->getOTP[0]->try < 10) {
                $try = 5;
                if ($user->getOTP[0]->code === $data['code']) {
                    $user->active_otp = 1;
                    $user->save();
                    $user->getOTP[0]->active = 1;
                    $user->getOTP[0]->save();
                    $token = $user->createToken('***' . $phone . '***')->plainTextToken;
                    $message = [
                        'status' => 201,
                        'data' => [
                            'token' => $token,
                            'verify' =>$user->is_verify,
                        ]
                    ];
                    return Response()->json($message, 201);
                } else {

                    $user->getOTP[0]->try += 1;
                    $user->getOTP[0]->save();

                    $try = 10 - $user->getOTP[0]->try;

                    $message = [
                        'status' => 401,
                        'try' => $try,
                        'errors' => ['code' => __('auth.wrongcode')]
                    ];
                }
            }
            if (!$try) {
                $message = [
                    'status' => 401,
                    'errors' => ['code' => __('auth.Blockedaccount')]
                ];
            }
        } else {
            $message = [
                'status' => 401,
                'errors' => ['code' => __('auth.wrongcode')]
            ];
        }

        return Response()->json($message, 401);
    }
}
