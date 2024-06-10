import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import './departement2.css';

const Departement2 = () => {
  const [dossiers, setDossiers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/dossier")
      .then((response) => response.json())
      .then((data) => setDossiers(data))
      .catch((error) => console.error("Error fetching dossiers:", error));
  }, []);

  const handleAccuser = (id) => {
    Swal.fire({
      title: "Confirm Accuser",
      text: "Do you want to confirm sending the accuser?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/api/dossiers/${id}/accuser`, {
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire("Confirmed!", "The accuser has been sent.", "success");
          })
          .catch((error) => {
            console.error("Error sending accuser:", error);
            Swal.fire("Error!", "An error occurred while sending the accuser.", "error");
          });
      }
    });
  };

  const handleEdit = (id) => {
    Swal.fire({
      title: "Edit Regime Douanier",
      input: "text",
      inputLabel: "Regime Douanier",
      inputPlaceholder: "Enter the regime douanier",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/api/dossiers/${id}/regime_douanier`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ regime_douanier: result.value }),
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire("Saved!", "The regime douanier has been updated.", "success");
          })
          .catch((error) => {
            console.error("Error updating regime douanier:", error);
            Swal.fire("Error!", "An error occurred while updating the regime douanier.", "error");
          });
      }
    });
  };

  const handleDeclarant = (id) => {
    // Placeholder function for handling declarant selection
    // Implement this based on your declarant selection logic
    Swal.fire("Functionality not implemented", "This functionality needs to be implemented", "info");
  };

  return (
    <div className="departement2">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Exportateur</th>
              <th>Destinataire</th>
              <th>Date Ouverture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dossiers.map((dossier) => (
              <tr key={dossier.id_dossier}>
                <td>{dossier.id_dossier}</td>
                <td>{dossier.exportateur}</td>
                <td>{dossier.destinataire}</td>
                <td>{dossier.date_ouverture}</td>
                <td>
                  <button onClick={() => handleAccuser(dossier.id_dossier)}>Accuser</button>
                  <button onClick={() => handleEdit(dossier.id_dossier)}>Edit</button>
                  <button onClick={() => handleDeclarant(dossier.id_dossier)}>Select Declarant</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departement2;
