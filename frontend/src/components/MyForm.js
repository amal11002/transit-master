import React, { useState } from 'react';
import './MyForm.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyForm = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    exportateur: '',             
    destinataire: '',            
    date_ouverture: '',          
    provenance: '',              
    regime_client: '',          
    mode_transport: '',         
    num_dr_gls: '',             
    num_lta_bl: '',             
    nombre_total_colis: '',     
    poids_total_brut: '',       
    poids_total_net: '',        
    volume_total: '',           
    description: '',            
    date_estimative_darrivee: '',
    date_reele_darrivee: '',     
    cree_par: ''
  });

  const navigate = useNavigate();

  // Vérification de l'ID du dossier stocké localement au chargement du composant
  useState(() => {
    const storedDossierId = localStorage.getItem('dossierId');
    if (storedDossierId) {
      setStep(1); // Passer directement à l'étape 3 si un ID de dossier est trouvé
    }
  }, []); // Utiliser une dépendance vide pour s'assurer que cela se produit une seule fois au chargement du composant

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);
    setFormValues(prevValues => ({
      ...prevValues,
      date_transmission_operation: currentDate
    }));

    Swal.fire({
      title: 'Étape suivante',
      text: 'Vous allez passer à l\'étape suivante',
      timer: 1000,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      setStep((prevStep) => prevStep + 1);
    });
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/dossiers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la soumission du formulaire');
      }
      return response.json();
    })
    .then(data => {
      // Enregistrement de l'ID du dossier dans le stockage local
      localStorage.setItem('dossierId', data.id_dossier);
      setStep((prevStep) => prevStep + 1);      
      Swal.fire({
        title: 'Succès !',
        text: 'Données enregistrées avec succès.',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        // Naviguer vers la page de fichiers
        navigate(`/fichier`);
      });
    })
    .catch(error => {
      console.error('Erreur:', error);
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de l\'enregistrement des données.',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
    });
  }
  
  return (
   
    <div className="form-container">
      <center>
      <div className="styled-paper">
        <h2 className="form-title">Étape {step}</h2>
        <form onSubmit={step === 3 ? handleSubmit : handleNextStep}>
          {step === 1 && (
            <>
              <center>Exportateur</center>
              <input
                type="text"
                name="exportateur"
                value={formValues.exportateur}
                onChange={handleChange}
                className="form-field"
              />
              <center>Destinataire</center>
              <input
                type="text"
                name="destinataire"
                value={formValues.destinataire}
                onChange={handleChange}
                className="form-field"
              />
              <center>Régime client</center>
              <input
                type="text"
                name="regime_client"
                value={formValues.regime_client}
                onChange={handleChange}
                className="form-field"
              />
              <center>N° DR GLS</center>
              <input
                type="text"
                name="num_dr_gls"
                value={formValues.num_dr_gls}
                onChange={handleChange}
                className="form-field"
              />
              <center>Provenance</center>
              <input
                type="text"
                name="provenance"
                value={formValues.provenance}
                onChange={handleChange}
                className="form-field"
              />
              <button type="submit" className="submit-button">Suivant</button>
            </>
          )}
          {step === 2 && (
            <>
              <center>Mode de transport</center>
              <select
                name="mode_transport"
                value={formValues.mode_transport}
                onChange={handleChange}
                className="form-field"
              >
                <option value="Maritime">Maritime</option>
                <option value="Aérien">Aérien</option>
              </select>
              <center>N° LTA /BL</center>
              <input
                type="text"
                name="num_lta_bl"
                value={formValues.num_lta_bl}
                onChange={handleChange}
                className="form-field"
              />
              <center>Nombre Total de Colis</center>
              <input
                type="text"
                name="nombre_total_colis"
                value={formValues.nombre_total_colis}
                onChange={handleChange}
                className="form-field"
              />
              <center>Poids Total Brut en Kg</center>
              <input
                type="text"
                name="poids_total_brut"
                value={formValues.poids_total_brut}
                onChange={handleChange}
                className="form-field"
              />
              <center>Poids Total Net en Kg</center>
              <input
                type="text"
                name="poids_total_net"
                value={formValues.poids_total_net}
                onChange={handleChange}
                className="form-field"
              />
              <button
                onClick={handlePreviousStep}
                className="precedent-button"
              >
                Précédent
              </button>
              <button
                type="submit"
                className="submit-button"
              >
                Suivant
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <center>Volume Total en m<sup>3</sup></center>
              <input
                type="text"
                name="volume_total"
                value={formValues.volume_total}
                onChange={handleChange}
                className="form-field"
              />
              <center>Date Estimative d'Arrivée</center>
              <input
                type="date"
                name="date_estimative_darrivee"
                value={formValues.date_estimative_darrivee}
                onChange={handleChange}
                className="form-field"
              />
              <center>Date Réelle d'Arrivée</center>
              <input
                type="date"
                name="date_reele_darrivee"
                value={formValues.date_reele_darrivee}
                onChange={handleChange}
                className="form-field"
              />
              <center>Créé Par</center>
              <input
                type="text"
                name="cree_par"
                value={formValues.cree_par}
                onChange={handleChange}
                className="form-field"
              />
              <button
                onClick={handlePreviousStep}
                className="precedent-button"
              >
                Précédent
              </button>
              <button
                type="submit"
                className="register-button"
              >
                Enregistrer
              </button>
            </>
          )}
        </form>
      </div>
      </center>
    </div>
   
  );
  
};

export default MyForm;
