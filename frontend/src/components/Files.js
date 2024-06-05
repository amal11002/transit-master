import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Files.css';

const Files = () => {
  const [dossierId, setDossierId] = useState(null); // Stocker l'ID du dossier localement
  const [packingList, setPackingList] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [ltaBl, setLtaBl] = useState(null);

  useEffect(() => {
    // Récupérer l'ID du dossier depuis le stockage local du navigateur (localStorage)
    const storedDossierId = localStorage.getItem('dossierId');
    if (storedDossierId) {
      setDossierId(storedDossierId);
    }
  }, []); // Effectuer cette opération une seule fois au chargement du composant

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setFile({
        name: file.name,
        type: file.type,
        content: reader.result.split(',')[1] // Extraire la base64 uniquement
      });
    };

    reader.readAsDataURL(file); // Lire le fichier en tant que base64
  };

  const getFilePreview = (file) => {
    if (!file) return null;

    const fileType = getFileType(file.name);
    switch (fileType) {
      case 'pdf':
        return <img src="/pdf-icon.png" alt="PDF" className="file-preview" />;
      case 'image':
        return <img src={URL.createObjectURL(new Blob([file.content], { type: file.type }))} alt="Image" className="file-preview" />;
      default:
        return <span className="file-preview">Preview not available</span>;
    }
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'pdf';
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'image';
      default:
        return 'unknown';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Traitement et envoi du premier fichier
      if (packingList) {
        await uploadFile(packingList);
      }

      // Traitement et envoi du deuxième fichier
      if (invoice) {
        await uploadFile(invoice);
      }

      // Traitement et envoi du troisième fichier
      if (ltaBl) {
        await uploadFile(ltaBl);
      }

      // Afficher une alerte de confirmation si tous les fichiers ont été envoyés avec succès
      Swal.fire({
        title: 'Succès!',
        text: `Les fichiers du dossier ${dossierId} ont été sauvegardés.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      // Afficher une alerte d'erreur si une erreur survient lors de l'envoi des fichiers
      Swal.fire({
        title: 'Erreur!',
        text: 'Une erreur est survenue lors de la sauvegarde des fichiers.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Fonction pour télécharger et envoyer un fichier à l'API
  const uploadFile = async (file) => {
    try {
      console.log('Uploading file:', file);
      const formData = new FormData();
      formData.append('nom_fichier', file.name);
      formData.append('type_fichier', file.type); // Utiliser file.type pour le type de fichier
      formData.append('id_dossier', dossierId);
      formData.append('content', file.content); // Ajouter le contenu du fichier en base64

      const response = await fetch('http://localhost:8000/api/fichiers', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload file: ${errorText}`);
      }

      const result = await response.json();
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Relancer l'erreur pour que la fonction appelante puisse la gérer
    }
  };

  return (
    <div className="files-container">
      <div className="files-paper">
        <center>
        <h2 className="files-title">Charger des fichiers pour le dossier {dossierId}</h2> </center>
        <hr></hr>
        <form onSubmit={handleSubmit} className="files-form">
          <div className="files-field">
          <center> <h3 className="field-title">Packing List</h3> </center>
          <div className='class'>
            <div className="file-container">
              <input type="file" onChange={(e) => handleFileChange(e, setPackingList)} />
              {getFilePreview(packingList)}
            </div>
          </div>
          </div>
          <div className="files-field">
          <center>    <h3 className="field-title">Facture</h3> </center>

          <div className='class'>
            <div className="file-container">
              <input type="file" onChange={(e) => handleFileChange(e, setInvoice)} />
              {getFilePreview(invoice)}
            </div>
            </div>
          </div>
          <div className="files-field">
          <center>        <h3 className="field-title">LTA/BL</h3> </center>

          <div className='class'>
            <div className="file-container">
              <input type="file" onChange={(e) => handleFileChange(e, setLtaBl)} />
              {getFilePreview(ltaBl)}
            </div>
            </div>
          </div>
          <center>
          <button type="submit" className="submit-button">Enregistrer</button>

          </center>
        </form>
      </div>
    </div>
  );
};

export default Files;
