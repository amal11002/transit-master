<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Minute extends Model
{
    protected $fillable = [
        'id_dossier',
        'code_entreprise',
        'origine',
        'declarant',
        'valeur_facture',
        'nombre_colis',
        'mode_transport',
        'provenance',
        'devise',
        'taux_de_change',
        'valeur_fret',
        'autres_frais',
        'valeur_assurance',
        'caf_ndj',
        'valeur_statistiques',
        'valeur_imposables'
    ];

    public function dossier()
    {
        return $this->belongsTo(Dossier::class, 'id_dossier');
    }
}
