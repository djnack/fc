<?php

namespace App\Rules;

use App\Models\Other\ConvertNumberToEnglish;
use App\Models\User;
use Illuminate\Contracts\Validation\Rule;

class PhoneNumberIsBlock implements Rule
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
        $value = ConvertNumberToEnglish::Convert($value);

        $pattern = '%^(0|\+98|98|0098)?(9\d{9})$%i';
        $value = '0' . preg_replace($pattern, "$2", $value);


        return !User::wherePhone($value)->where('is_block', 1)->first();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'حساب کاربری شما غیرفعال می باشد.';
    }
}
