<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    protected $table = 'departement';
    protected $primaryKey = 'id_departement';
    protected $fillable = ['nom_departement', 'responsable_departement'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_departement', 'departement_id', 'user_id');
    }
}
