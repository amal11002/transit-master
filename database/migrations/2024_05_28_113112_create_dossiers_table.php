<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDossiersTable extends Migration
{
    public function up()
    {
        Schema::create('dossiers', function (Blueprint $table) {
            $table->id('id_dossier');
            $table->string('exportateur', 100);
            $table->string('destinataire', 100);
            $table->date('date_ouverture')->nullable();
            $table->string('provenance', 255)->nullable();
            $table->string('regime_client', 255)->nullable();
            $table->string('mode_transport', 255)->nullable();
            $table->string('num_dr_gls', 255)->nullable();  // Renommé
            $table->string('num_lta_bl', 255)->nullable();  // Renommé
            $table->integer('nombre_total_colis')->nullable();
            $table->decimal('poids_total_brut', 10, 2)->nullable();
            $table->decimal('poids_total_net', 10, 2)->nullable();
            $table->decimal('volume_total', 10, 2)->nullable();
            $table->date('date_estimative_darrivee')->nullable();
            $table->date('date_transmission_operation')->nullable();
            $table->date('date_reele_darrivee')->nullable();
            $table->string('accuse_reception_traitement', 255)->nullable();
            $table->string('regime_douanier', 255)->nullable();
            $table->unsignedBigInteger('id_agence')->nullable();
            $table->date('ed_d48_date_depot_client')->nullable();
            $table->date('ed_d48_date_retrait_client')->nullable();
            $table->date('ed_d48_date_intro_douane')->nullable();
            $table->date('date_depot_franchise')->nullable();
            $table->date('date_livraison_colis')->nullable();
            $table->string('franchise_accordee', 255)->nullable();
            $table->string('franchise_apuree', 255)->nullable();
            $table->decimal('total_cout_operation', 10, 2)->nullable();
            $table->integer('temps_de_transit')->nullable();
            $table->date('date_transmission_dossier_facture')->nullable();
            $table->string('num_date_facture', 255)->nullable();
            $table->decimal('montant_facture', 10, 2)->nullable();
            $table->date('date_depot_facture_client')->nullable();
            $table->date('date_echeance_paiement_facture')->nullable();
            $table->string('mode_date_reglement_facture', 255)->nullable();
            $table->string('reference_reglement_facture', 255)->nullable();
            $table->text('observation_client')->nullable();
            $table->text('observation_gls')->nullable();
            $table->text('description')->nullable();
            $table->string('cree_par', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('dossiers');
    }
}
