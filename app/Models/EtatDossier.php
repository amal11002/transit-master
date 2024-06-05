<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EtatDossier extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_etat_dossier';

    public function dossier()
    {
        return $this->belongsTo(Dossier::class, 'dossier_id');
    }
}
