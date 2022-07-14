<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class LogoutController extends Controller
{
    public function Logout()
    {

        auth()->user()->currentAccessToken()->delete();

        $message = [
            'status' => 200,
            'data' => ['message' => 'Logout']
        ];

        return Response()->json($message, 200);
    }
}
