<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dossier extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_dossier';

    protected $fillable = [
        'exportateur',
        'destinataire',
        'date_ouverture',
        'provenance',
        'regime_client',
        'mode_transport',
        'num_dr_gls',  // Renommé
        'num_lta_bl',  // Renommé
        'nombre_total_colis',
        'poids_total_brut',
        'poids_total_net',
        'volume_total',
        'date_estimative_darrivee',
        'date_transmission_operation',
        'date_reele_darrivee',
        'accuse_reception_traitement',
        'regime_douanier',
        'id_agence',
        'ed_d48_date_depot_client',
        'ed_d48_date_retrait_client',
        'ed_d48_date_intro_douane',
        'date_depot_franchise',
        'date_livraison_colis',
        'franchise_accordee',
        'franchise_apuree',
        'total_cout_operation',
        'temps_de_transit',
        'date_transmission_dossier_facture',
        'num_date_facture',
        'montant_facture',
        'date_depot_facture_client',
        'date_echeance_paiement_facture',
        'mode_date_reglement_facture',
        'reference_reglement_facture',
        'observation_client',
        'observation_gls',
        'description',
        'cree_par',
    ];

    public function etatDossier()
    {
        return $this->hasOne(EtatDossier::class, 'dossier_id');
    }

    public function facturation()
    {
        return $this->hasOne(Facturation::class, 'dossier_id');
    }

    public function colis()
    {
        return $this->hasMany(Colis::class, 'id_dossier');
    }
}
