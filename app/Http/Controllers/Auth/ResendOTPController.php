<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Auth\OTP;
use App\Models\Other\ConvertNumberToEnglish;
use App\Models\Other\ConvertPhoneNumberStandard;
use App\Models\User;
use App\Rules\PhoneNumberIsBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ResendOTPController extends Controller
{
    public function ResendOTP(Request $req)
    {
        $this->validate($req, [
            'phone' => ['required', new PhoneNumberIsBlock],
        ]);

        $data = ConvertNumberToEnglish::ConvertAll($req->all());
        $phone = ConvertPhoneNumberStandard::Convert($data['phone']);

        $user = User::wherePhone($phone)->with('getOTP')->first();


        if ($user) {
            if (count($user->getOTP) && $user->getOTP[0]->try >= 10) {
                $message = [
                    'status' => 401,
                    'errors' => ['otp' => __('auth.Blockedaccount')]
                ];
            } else {
                if (count($user->getOTP) && $user->getOTP[0]->active) {

                    $otp = new OTP;
                    $otp->user_id = $user->id;
                    $otp->code = OTP::getRandomCode();
                    $otp->resend_at = now();
                    $otp->save();

                    $message = [
                        'status' => 201,
                        'errors' => ['otp' => __('auth.resendcode')]
                    ];
                    return Response()->json($message, 201);

                    // Send SMS

                } else {
                    if (
                        count($user->getOTP) && $user->getOTP[0]->resend_at >
                        now()->subMinutes(2)
                    ) {
                        $message = [
                            'status' => 401,
                            'errors' => ['otp' => __('auth.trycode')]
                        ];
                    } else {
                        if ($user->getOTP[0]->try_resend >= 5) {
                            $message = [
                                'status' => 401,
                                'errors' => ['otp' => __('auth.blocksendcode')]
                            ];
                        } else {
                            $user->getOTP[0]->try_resend += 1;
                            $user->getOTP[0]->resend_at = now();
                            $user->getOTP[0]->save();

                            $message = [
                                'status' => 201,
                                'errors' => ['otp' =>__('auth.resendcode')]
                            ];
                            return Response()->json($message, 201);

                            // Send SMS
                        }
                    }
                }
            }
        } else {
            $message = [
                'status' => 401,
                'errors' => ['otp' => __('auth.phonenotfind')]
            ];
        }

        return Response()->json($message, 401);
    }
}
