<?php 
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Dossier;
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
            'cree_par' => 'nullable|string|max:255',
        ]);

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
            'date_transmission_operation' => $validatedData['date_transmission_operation'],
            'date_reele_darrivee' => $validatedData['date_reele_darrivee'],
            'description' => $validatedData['description'],
            'cree_par' => $validatedData['cree_par'],
        ]);

        return response()->json(['message' => 'Dossier créé avec succès', 'id_dossier' => $dossier->id_dossier], 201);
    }

    // Méthode pour afficher un dossier par ID
    public function show($id)
    {
        $dossier = Dossier::find($id);

        if ($dossier) {
            return response()->json($dossier, 200);
        } else {
            return response()->json(['message' => 'Dossier non trouvé'], 404);
        }
    }

    // Méthode pour afficher tous les dossiers
    public function index()
    {
        $dossiers = Dossier::all();
        return response()->json($dossiers, 200);
    }

    // Méthode pour mettre à jour un dossier
    public function update(Request $request, $id)
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
            'cree_par' => 'nullable|string|max:255',
        ]);

        $dossier = Dossier::find($id);

        if ($dossier) {
            $dossier->update($validatedData);
            return response()->json(['message' => 'Dossier mis à jour avec succès'], 200);
        } else {
            return response()->json(['message' => 'Dossier non trouvé'], 404);
        }
    }

    // Méthode pour supprimer un dossier
    public function destroy($id)
    {
        $dossier = Dossier::find($id);

        if ($dossier) {
            $dossier->delete();
            return response()->json(['message' => 'Dossier supprimé avec succès'], 200);
        } else {
            return response()->json(['message' => 'Dossier non trouvé'], 404);
        }
    }



  // Fonction pour mettre à jour le champ date_transmission_operation d'un dossier spécifique
  public function updateDateTransmission(Request $request, $id)
  {
      // Recherche du dossier par ID
      $dossier = Dossier::find($id);

      // Vérification si le dossier existe
      if ($dossier) {
          // Mise à jour du champ date_transmission_operation avec la date actuelle
          $dossier->update(['date_transmission_operation' => now()]);
          // Retour d'une réponse JSON avec un message de succès
          return response()->json(['message' => 'Champ date_transmission_operation mis à jour avec succès'], 200);
      } else {
          // Retour d'une réponse JSON avec un message d'erreur si le dossier n'est pas trouvé
          return response()->json(['message' => 'Dossier non trouvé'], 404);
      }
  }

  public function checkDateEnvoieOperation($id)
  {
      $dossier = Dossier::find($id);

      if (!$dossier) {
          return response()->json(['message' => 'Dossier not found'], 404);
      }

      $isDateEnvoieOperationSet = !is_null($dossier->date_transmission_operation);

      return response()->json(['isDateEnvoieOperationSet' => $isDateEnvoieOperationSet]);
  }





}
