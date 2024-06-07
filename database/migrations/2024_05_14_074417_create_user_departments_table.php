<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_departments', function (Blueprint $table) {
            // Ajouter les colonnes user_id et departement_id
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('departement_id');

            // Ajouter les clés étrangères
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('departement_id')->references('id_departement')->on('departement')->onDelete('cascade');

            // Définir la clé primaire composite
            $table->primary(['user_id', 'departement_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_departments');
    }
};
