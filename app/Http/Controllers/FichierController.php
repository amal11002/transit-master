<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fichier;

class FichierController extends Controller
{
    // Méthode pour créer un nouveau fichier
    public function store(Request $request)
    {
        // Valider les données du formulaire
        $validatedData = $request->validate([
            'nom_fichier' => 'required|string|max:255',
            'type_fichier' => 'required|string|max:255',
            'id_dossier' => 'required|exists:dossiers,id_dossier', // Vérifier que l'id du dossier existe dans la table "dossiers"
        ]);

        // Créer un nouveau fichier avec les données validées
        $fichier = Fichier::create([
            'nom_fichier' => $validatedData['nom_fichier'],
            'type_fichier' => $validatedData['type_fichier'],
            'id_dossier' => $validatedData['id_dossier'],
        ]);

        // Retourner une réponse JSON avec le fichier créé
        return response()->json(['fichier(s) enregistré(s) avec success' => $fichier], 201);
    }
}
