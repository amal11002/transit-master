<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTcsTable extends Migration
{
    public function up()
    {
        Schema::create('tc', function (Blueprint $table) {
            $table->id('id_tc');
            $table->unsignedBigInteger('id_colis');
            $table->unsignedBigInteger('id_dossier');
            $table->integer('nombre_colis')->nullable();
            $table->decimal('volume', 10, 2)->nullable();
            $table->decimal('poids', 10, 2)->nullable();
            $table->string('code')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('id_colis')->references('id_colis')->on('colis')->onDelete('cascade');
            $table->foreign('id_dossier')->references('id_dossier')->on('dossiers')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tc');
    }
}
