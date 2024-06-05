<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fichier extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_fichier',
        'type_fichier',
        'id_dossier',
    ];

    public function dossier()
    {
        return $this->belongsTo(Dossier::class, 'id_dossier');
    }
}
    