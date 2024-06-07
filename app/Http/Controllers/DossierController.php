<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dossier;
use Illuminate\Support\Facades\Auth;

class DossierController extends Controller
{
    // Méthode pour créer un nouveau dossier
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'exportateur' => 'required|string|max:100',
            'destinataire' => 'required|string|max:100',
            'date_ouverture' => 'nullable|date',
            'provenance' => 'nullable|string|max:255',
            'regime_client' => 'nullable|string|max:255',
            'mode_transport' => 'nullable|string|max:255',
            'num_dr_gls' => 'nullable|string|max:255',
            'num_lta_bl' => 'nullable|string|max:255',
            'nombre_total_colis' => 'nullable|integer',
            'poids_total_brut' => 'nullable|numeric',
            'poids_total_net' => 'nullable|numeric',
            'volume_total' => 'nullable|numeric',
            'date_estimative_darrivee' => 'nullable|date',
            'date_transmission_operation' => 'nullable|date',
            'date_reele_darrivee' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        // Récupérer l'utilisateur actuellement authentifié
        $user = Auth::user();

        $dossier = Dossier::create([
            'exportateur' => $validatedData['exportateur'],
            'destinataire' => $validatedData['destinataire'],
            'date_ouverture' => now(),
            'provenance' => $validatedData['provenance'],
            'regime_client' => $validatedData['regime_client'],
            'mode_transport' => $validatedData['mode_transport'],
            'num_dr_gls' => $validatedData['num_dr_gls'],
            'num_lta_bl' => $validatedData['num_lta_bl'],
            'nombre_total_colis' => $validatedData['nombre_total_colis'],
            'poids_total_brut' => $validatedData['poids_total_brut'],
            'poids_total_net' => $validatedData['poids_total_net'],
            'volume_total' => $validatedData['volume_total'],
            'date_estimative_darrivee' => $validatedData['date_estimative_darrivee'],
            'date_transmission_operation' => now(), // Utilisation de la date actuelle
            'date_reele_darrivee' => $validatedData['date_reele_darrivee'],
            'description' => $validatedData['description'],
            'cree_par' => $user->id, // Association de l'ID de l'utilisateur actuel
        ]);

        return response()->json(['message' => 'Dossier créé avec succès', 'id_dossier' => $dossier->id_dossier], 201);
    }

    // Autres méthodes du contrôleur ici...
}
