<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = ['message_notification', 'date_notification', 'id_user_destinataire', 'id_dossier'];

    public function dossiers()
    {
        return $this->belongsToMany(Dossier::class);
    }
}
