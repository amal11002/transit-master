<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFichiersTable extends Migration
{
    public function up()
    {
        Schema::create('fichiers', function (Blueprint $table) {
            $table->id();
            $table->string('nom_fichier');
            $table->string('type_fichier');
            $table->unsignedBigInteger('id_dossier');
            $table->foreign('id_dossier')->references('id_dossier')->on('dossiers');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fichiers');
    }
}
