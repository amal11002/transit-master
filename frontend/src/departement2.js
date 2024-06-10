import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './departement2.css';
import ProfileDropdown from './ProfileDropdown';

const Departement2 = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState({});
  const [dossiers, setDossiers] = useState([]); // Ajout du state pour les dossiers
  const [selectedDossier, setSelectedDossier] = useState(null); // State pour le dossier sélectionné
  const [viewModalOpen, setViewModalOpen] = useState(false); // State pour la modal de vue
  const [processingModalOpen, setProcessingModalOpen] = useState(false); // State pour la modal de traitement
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
      return;
    }

    const fetchUserData = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            'Authorization': 'Bearer ' + token,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const user = await response.json();
        setUser(user);
        console.log(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch des dossiers avec date_envoie_operation renseignée
    const fetchDossiers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dossiers/date_envoie_operation');
        if (!response.ok) {
          throw new Error('Failed to fetch dossiers');
        }
        const data = await response.json();
        setDossiers(data);
      } catch (error) {
        console.error('Error fetching dossiers:', error);
      }
    };

    fetchDossiers();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const navigateTo = (path) => {
    if (Object.keys(user).length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Chargement en cours...',
        text: 'Veuillez patienter.',
      });
      return;
    }

    navigate(path);
  };

  const handleViewDossier = (dossier) => {
    setSelectedDossier(dossier);
    setViewModalOpen(true);
  };

  const handleProcessDossier = (dossier) => {
    setSelectedDossier(dossier);
    setProcessingModalOpen(true);
  };

  const userRole = user.data?.role || [];

  return (
    <div className={darkMode ? 'departement2 dark-mode' : 'departement2'}>
      <div className="navbar">
        <h1>Département 2</h1>
        <div className="navbar-buttons">
          <button onClick={() => navigateTo('/dashboard')}>Dashboard</button>
          <button onClick={() => navigateTo('/profile')}>Profil</button>
          <ProfileDropdown user={user} />
          <button onClick={toggleDarkMode}>Mode Sombre</button>
        </div>
      </div>
      <div className="content">
        {/* Liste des dossiers */}
        <div className="dossier-list">
          {dossiers.map((dossier) => (
            <div key={dossier.id} className="dossier-item">
              <img src="dossier-closed.png" alt="Dossier fermé" className="dossier-image" />
              <img src="dossier-open.png" alt="Dossier ouvert" className="dossier-image-open" />
              <div className="dossier-actions">
                {/* Bouton pour afficher la modal de vue */}
                <button className="action-button" onClick={() => handleViewDossier(dossier)}>
                  <img src="read-icon.png" alt="Lire" />
                </button>
                {/* Bouton pour afficher la modal de traitement */}
                <button className="action-button" onClick={() => handleProcessDossier(dossier)}>
                  <img src="edit-icon.png" alt="Modifier" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de vue */}
        {viewModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Dossier</h2>
              <p>Contenu du dossier ici</p>
              <button onClick={() => setViewModalOpen(false)}>Fermer</button>
            </div>
          </div>
        )}

        {/* Modal de traitement */}
        {processingModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Traitement du dossier</h2>
              <p>Formulaire de traitement ici</p>
              <button onClick={() => setProcessingModalOpen(false)}>Fermer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Departement2;
