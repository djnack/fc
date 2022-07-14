<?php

namespace App\Http\Controllers\Verify;

use App\Http\Controllers\Controller;
use App\Models\Insurance;
use App\Models\Other\ConvertNumberToEnglish;
use App\Models\Verify\Verify;
use App\Rules\BloodType;
use App\Rules\PersianAlpha;
use Illuminate\Http\Request;

class VerifyController extends Controller
{
    public function VerifyPersonal(Request $req)
    {
        $user = $req->user();
        if ($user->level_verify === 1 && !$user->is_verify) {
            $req->merge([
                'first_name' => ConvertNumberToEnglish::convert($req->first_name),
                'last_name' => ConvertNumberToEnglish::convert($req->last_name),
                'parent_name' => ConvertNumberToEnglish::convert($req->parent_name),
                'id_cart' => ConvertNumberToEnglish::convert($req->id_cart),
                'id_passport' => ConvertNumberToEnglish::convert($req->id_passport),
                'sex' => ConvertNumberToEnglish::convert($req->sex),
                'birth_day' => ConvertNumberToEnglish::convert($req->birth_day),
            ]);

            $this->validate($req, [
                'first_name' => ['required', 'min:3', new PersianAlpha()],
                'last_name' => ['required', 'min:3', new PersianAlpha()],
                'parent_name' => ['required', 'min:3', new PersianAlpha()],
                'id_cart' => 'required | digits:10 | unique:users,id_cart,' . $req->user()->id,
                'id_passport' => 'required | numeric ',
                'sex' => 'required | digits:1',
                'birth_day' => 'required | date_format:Y/m/d',
            ]);
            $this->validate($req, [
                'id_passport' => 'string | max:10 ',
            ]);

            $user->first_name = $req->first_name;
            $user->last_name = $req->last_name;
            $user->parent_name = $req->parent_name;
            $user->id_cart = $req->id_cart;
            $user->id_passport = $req->id_passport;
            $user->sex = $req->sex;
            $user->birth_day = $req->birth_day;
            $user->level_verify = 2;
            $user->save();

            $message = [
                'status' => 201,
                'data' => [
                    'message' => 'تغییرات با موفقیت ذخیره شد',
                    'next_page' => 'verify',
                    'part' => 'verify_insurance'
                ]
            ];

            return response()->json($message, 201);
        } else {
            return $this->RedirectVerify($user);
        }
    }

    public function VerifyInsurance(Request $req)
    {
        $user = $req->user();
        if ($user->level_verify === 2 && !$user->is_verify) {
            $req->merge([
                'expired' => ConvertNumberToEnglish::convert($req->expired),
            ]);
            $this->validate($req, [
                'expired' => 'required | date_format:Y/m/d',
                'image' => 'required | max:2048 | mimes:jpeg,jpg,png',
            ]);

            $name = $req->file('image')->store('image/verify/Insurance');
            $name = explode('image/verify/Insurance/', $name)[1];

            $insurance = new Insurance;
            $insurance->user_id = $user->id;
            $insurance->expired = $req->expired;
            $insurance->path = $name;
            $insurance->save();

            $user->level_verify = 3;
            $user->save();

            $message = [
                'status' => 201,
                'data' => [
                    'next_page' => 'verify',
                    'part' => 'verify_physical',
                ]
            ];
            return Response()->json($message, 201);
        } else {
            return $this->RedirectVerify($user);
        }
    }

    public function VerifyPhysical(Request $req)
    {
        $user = $req->user();
        if ($user->level_verify === 3 && !$user->is_verify) {
            $req->merge([
                'blood_type' => ConvertNumberToEnglish::convert($req->blood_type),
                'disease' => ConvertNumberToEnglish::convert($req->disease),
                'medicine' => ConvertNumberToEnglish::convert($req->medicine),
                'sensitivity' => ConvertNumberToEnglish::convert($req->sensitivity),
            ]);

            $this->validate($req, [
                'blood_type' => ['required', new BloodType]
            ]);

            $verify = new Verify;
            $verify->user_id = $user->id;
            $verify->blood_type = $req->blood_type;
            $verify->disease = $req->disease;
            $verify->medicine = $req->medicine;
            $verify->sensitivity = $req->sensitivity;
            $verify->save();

            $user->is_verify = 1;
            $user->level_verify = 4;
            $user->save();

            $message = [
                'status' => 201,
                'data' => [
                    'next_page' => 'profile',
                    'part' => '',
                ]
            ];
            return Response()->json($message, 201);
        } else {
            return $this->RedirectVerify($user);
        }
    }

    public function RedirectVerify($user)
    {
        if ($user->is_verify) {
            $message = [
                'status' => 302,
                'data' => [
                    'next_page' => 'profile',
                    'part' => '',
                    'is_verify' => true
                ]
            ];
        } else {
            $message = [
                'status' => 302,
                'data' => [
                    'next_page' => 'verify',
                    'is_verify' => false
                ]
            ];
            $level = [1 => 'verify_personal', 2 => 'verify_insurance', 3 => 'verify_physical', 4 => ''];
            $message['data']['part'] = $level[$user->level_verify];
        }
        return Response()->json($message, 302);
    }
}
