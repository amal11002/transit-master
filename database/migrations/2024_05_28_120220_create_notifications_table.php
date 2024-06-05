<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->text('message_notification');
            $table->date('date_notification');
            $table->unsignedBigInteger('id_user_destinataire');
            $table->unsignedBigInteger('id_dossier');
            $table->foreign('id_user_destinataire')->references('id')->on('users');
            $table->foreign('id_dossier')->references('id_dossier')->on('dossiers');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}