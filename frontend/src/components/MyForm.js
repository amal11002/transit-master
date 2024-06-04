import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './MyForm.css';

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

  useEffect(() => {
    const storedDossierId = localStorage.getItem('dossierId');
    if (storedDossierId) {
      setStep(1);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
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
      localStorage.setItem('dossierId', data.id_dossier);
      setStep((prevStep) => prevStep + 1);      
      Swal.fire({
        title: 'Succès !',
        text: 'Données enregistrées avec succès.',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
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
      <div className="styled-paper">
        <h5 className="form-title"><center>Étape {step}</center></h5>
        <form onSubmit={step === 3 ? handleSubmit : handleNextStep}>
          {step === 1 && (
            <>
              <label><center>Exportateur</center></label>
              <input
                name="exportateur"
                value={formValues.exportateur}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Destinataire</center></label>
              <input
                name="destinataire"
                value={formValues.destinataire}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Régime client</center></label>
              <input
                name="regime_client"
                value={formValues.regime_client}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>N° DR GLS</center></label>
              <input
                name="num_dr_gls"
                value={formValues.num_dr_gls}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Provenance</center></label>
              <input
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
              <label><center>Mode de transport</center></label>
              <select
                name="mode_transport"
                value={formValues.mode_transport}
                onChange={handleChange}
                className="form-field"
              >
                <option value="">Choisir un mode de transport</option>
                <option value="Maritime">Maritime</option>
                <option value="Aérien">Aérien</option>
              </select>
              <label><center>N° LTA /BL</center></label>
              <input
                name="num_lta_bl"
                value={formValues.num_lta_bl}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Nombre Total de Colis</center></label>
              <input
                name="nombre_total_colis"
                value={formValues.nombre_total_colis}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Poids Total Brut en Kg</center></label>
              <input
                name="poids_total_brut"
                value={formValues.poids_total_brut}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Poids Total Net en Kg</center></label>
              <input
                name="poids_total_net"
                value={formValues.poids_total_net}
                onChange={handleChange}
                className="form-field"
              />
              <button onClick={handlePreviousStep} className="submit-button secondary">Précédent</button>
              <button type="submit" className="submit-button">Suivant</button>
            </>
          )}
          {step === 3 && (
            <>
              <label><center>Volume Total en m<sup>3</sup></center></label>
              <input
                name="volume_total"
                value={formValues.volume_total}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Date Estimative d'Arrivée</center></label>
              <input
                name="date_estimative_darrivee"
                type="date"
                value={formValues.date_estimative_darrivee}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Date Réelle d'Arrivée</center></label>
              <input
                name="date_reele_darrivee"
                type="date"
                value={formValues.date_reele_darrivee}
                onChange={handleChange}
                className="form-field"
              />
              <label><center>Créé Par</center></label>
              <input
                name="cree_par"
                value={formValues.cree_par}
                onChange={handleChange}
                className="form-field"
              />
              <button onClick={handlePreviousStep} className="submit-button secondary">Précédent</button>
              <button type="submit" className="submit-button">Enregistrer</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyForm;
