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
        Schema::create('user_roles', function (Blueprint $table) {
            // Ajouter les colonnes nécessaires pour les clés étrangères
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('role_id');

            // Définir les contraintes de clé étrangère
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('role_id')->references('id_role')->on('role')->onDelete('cascade');

            // Définir la clé primaire composite
            $table->primary(['user_id', 'role_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_roles');
    }
};
