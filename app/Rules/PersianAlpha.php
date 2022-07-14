<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PersianAlpha implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return preg_match("/^[\x{621}-\x{64A}\s\x{600}-\x{6FF}]+$/ui", $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'لطفا فارسی تایپ کنید';
    }
}
