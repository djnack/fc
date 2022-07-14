<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Auth\OTP;
use App\Models\Other\ConvertNumberToEnglish;
use App\Models\Other\ConvertPhoneNumberStandard;
use App\Models\User;
use App\Rules\PhoneNumberUnique;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function Register(Request $req)
    {
        $this->validate($req, [
            'phone' => ['required', new PhoneNumberUnique],
            'password' => 'required | string | min:8 | confirmed',
        ]);

        $data = ConvertNumberToEnglish::ConvertAll($req->all());
        $phone = ConvertPhoneNumberStandard::Convert($data['phone']);

        if (!$user =  User::wherePhone($phone)->first()) {
            $user = new User;
        }
        $user->phone = $phone;
        $user->password = Hash::make($data['password']);
        $user->save();

        $otp = new OTP;
        $otp->user_id = $user->id;
        $otp->code = OTP::getRandomCode();
        $otp->resend_at = now();
        $otp->save();

        // Send SMS



        $message = [
            'status' => 201,
            'data' => [
                'page'=>'otp',
            ]
        ];

        return Response()->json($message, 201);
    }
}
