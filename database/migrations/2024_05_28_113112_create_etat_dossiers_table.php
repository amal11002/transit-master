<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtatDossiersTable extends Migration
{
    public function up()
    {
        Schema::create('etat_dossiers', function (Blueprint $table) {
            $table->id('id_etat_dossier');
            $table->string('transfert_dossier', 255)->nullable();
            $table->string('accuse_reception', 255)->nullable();
            $table->string('transfert_declarant', 255)->nullable();
            $table->integer('declarant_id')->nullable();
            $table->string('accuse_reception_declarant', 255)->nullable();
            $table->string('transfert_minute_chef', 255)->nullable();
            $table->string('accuse_reception_minute', 255)->nullable();
            $table->string('minute_validee', 255)->nullable();
            $table->string('accuse_reception_minute_validee', 255)->nullable();
            $table->string('ed_d48_franchise_validee', 255)->nullable();
            $table->string('accuse_reception_ed_d48_franchise_client', 255)->nullable();
            $table->string('ed_d48_client_signee', 255)->nullable();
            $table->string('franchise_client_signee', 255)->nullable();
            $table->string('transfert_poursuivant', 255)->nullable();
            $table->integer('poursuivant_id')->nullable();
            $table->string('ed_d48_introduit_douane', 255)->nullable();
            $table->string('ed_d48_introduit_douane_validee', 255)->nullable();
            $table->string('franchise_introduite_douane', 255)->nullable();
            $table->string('franchise_introduite_douane_validee', 255)->nullable();
            $table->string('franchise_appuree', 255)->nullable();
            $table->string('transfert_dossier_livreur', 255)->nullable();
            $table->integer('livreur_id')->nullable();
            $table->string('colis_livre', 255)->nullable();
            $table->string('transfert_facturation', 255)->nullable();
            $table->string('accuse_reception_facturation', 255)->nullable();
            $table->unsignedBigInteger('id_dossier');
            $table->timestamps();

            $table->foreign('id_dossier')->references('id_dossier')->on('dossiers')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('etat_dossiers');
    }
}
