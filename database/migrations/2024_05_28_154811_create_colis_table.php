<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColisTable extends Migration
{
    public function up()
    {
        Schema::create('colis', function (Blueprint $table) {
            $table->id('id_colis');
            $table->string('numero_colis')->unique();
            $table->unsignedBigInteger('id_dossier');
            $table->unsignedBigInteger('id_expediteur')->nullable();
            $table->unsignedBigInteger('id_destinataire')->nullable();
            $table->unsignedBigInteger('id_agence_expedition')->nullable();
            $table->unsignedBigInteger('id_agence_destination')->nullable();
            $table->timestamps();

            $table->foreign('id_dossier')->references('id')->on('dossiers')->onDelete('cascade');
            $table->foreign('id_expediteur')->references('id')->on('users')->onDelete('set null');
            $table->foreign('id_destinataire')->references('id')->on('users')->onDelete('set null');
            $table->foreign('id_agence_expedition')->references('id')->on('agences')->onDelete('set null');
            $table->foreign('id_agence_destination')->references('id')->on('agences')->onDelete('set null');

            $table->unique('numero_colis');
            $table->index('id_dossier');
            $table->index('id_expediteur');
            $table->index('id_destinataire');
            $table->index('id_agence_expedition');
            $table->index('id_agence_destination');
        });
    }

    public function down()
    {
        Schema::dropIfExists('colis');
    }
}
