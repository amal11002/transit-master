<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facturation extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_facturation';

    public function dossier()
    {
        return $this->belongsTo(Dossier::class, 'dossier_id');
    }
}
