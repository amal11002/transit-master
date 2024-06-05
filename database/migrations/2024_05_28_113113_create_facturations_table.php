<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturationsTable extends Migration
{
    public function up()
    {
        Schema::create('facturations', function (Blueprint $table) {
            $table->id('id_facturation');
            $table->string('numero_facture', 255);
            $table->date('date_etablissement')->nullable();
            $table->decimal('montant', 10, 2)->nullable();
            $table->date('date_depot_au_client')->nullable();
            $table->date('date_echeance_paiement')->nullable();
            $table->string('mode_reglement', 255)->nullable();
            $table->date('date_reglement')->nullable();
            $table->string('reference_reglement', 255)->nullable();
            $table->unsignedBigInteger('dossier_id'); // Changement ici
            $table->timestamps();

            $table->foreign('dossier_id')->references('id_dossier')->on('dossiers')->onDelete('cascade'); // Changement ici
        });
    }

    public function down()
    {
        Schema::dropIfExists('facturations');
    }
}
