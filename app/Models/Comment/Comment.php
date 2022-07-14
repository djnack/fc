<?php

namespace App\Models\Comment;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'body',
        'publish',
        'subset',
    ];

    public function commentable()
    {
        return $this->morphTo();
    }

    public function getSubsetAttribute($value)
    {
        $count = Comment::whereSubset($this->id)
            ->where('commentable_id', $this->commentable_id)
            ->where('commentable_type', $this->commentable_type)
            ->count();
        return $count;
    }

    public function getUserIdAttribute($value)
    {

        // آی دی در سلکت زیر اجباریه نباید حذف بشه
        $user = User::select(['id', 'nick_name', 'first_name', 'images'])->find($value);
        $data['name'] = ($user->nick_name) ? $user->nick_name : $user->first_name;

        $data['image'] = $user->images['64x64'];

        // dd('user_id');
        return $data;
    }
}
