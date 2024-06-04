<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colis extends Model
{
    protected $primaryKey = 'id_colis';

    protected $fillable = [
        'numero_colis',
        'id_dossier',
        'id_expediteur',
        'id_destinataire',
        'id_agence_expedition',
        'id_agence_destination'
    ];

    public $timestamps = false;

    public function dossier()
    {
        return $this->belongsTo(Dossier::class, 'id_dossier');
    }

    public function expediteur()
    {
        return $this->belongsTo(User::class, 'id_expediteur');
    }

    public function destinataire()
    {
        return $this->belongsTo(User::class, 'id_destinataire');
    }

    public function agenceExpedition()
    {
        return $this->belongsTo(Agence::class, 'id_agence_expedition');
    }

    public function agenceDestination()
    {
        return $this->belongsTo(Agence::class, 'id_agence_destination');
    }
}
