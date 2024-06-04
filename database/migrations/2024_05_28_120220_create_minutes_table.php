<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMinutesTable extends Migration
{
    public function up()
    {
        Schema::create('minutes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_dossier')->nullable();
            $table->foreign('id_dossier')->references('id_dossier')->on('dossiers');
            $table->string('code_entreprise')->nullable();
            $table->string('origine')->nullable();
            $table->string('declarant')->nullable();
            $table->decimal('valeur_facture', 10, 2)->nullable();
            $table->integer('nombre_colis')->nullable();
            $table->string('mode_transport')->nullable();
            $table->string('provenance')->nullable();
            $table->string('devise', 3)->nullable();
            $table->decimal('taux_de_change', 10, 4)->nullable();
            $table->decimal('valeur_fret', 10, 2)->nullable();
            $table->decimal('autres_frais', 10, 2)->nullable();
            $table->decimal('valeur_assurance', 10, 2)->nullable();
            $table->decimal('caf_ndj', 10, 2)->nullable();
            $table->decimal('valeur_statistiques', 10, 2)->nullable();
            $table->decimal('valeur_imposables', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('minutes');
    }
}