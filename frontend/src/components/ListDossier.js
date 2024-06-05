import React, { useState, useEffect } from 'react';
import './ListDossier.css';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DossierComponent = () => {
    const [dossiers, setDossiers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [form, setForm] = useState({
        id: '',
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
    });
    const [selectedDossier, setSelectedDossier] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetchDossiers();
    }, []);

    const handleCreateClick = () => {
        navigate('/dossier');
    };

    const fetchDossiers = async () => {
        const response = await fetch('http://localhost:8000/api/dossiers');
        const data = await response.json();
        setDossiers(data);
    };

    const showEditModal = (dossier) => {
        setEditing(true);
        setForm({ ...dossier, id: dossier.id_dossier });
        setModalVisible(true);
        setCurrentPage(1); // Reset to the first page
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/update_dossier', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            fetchDossiers();
            setModalVisible(false);
        } else {
            console.error('Failed to update dossier');
        }
    };

    const deleteDossier = async (id) => {
        const response = await fetch(`http://localhost:8000/api/dossiers/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchDossiers();
        } else {
            console.error('Failed to delete dossier');
        }
    };

    const viewDossier = async (id) => {
        const response = await fetch(`http://localhost:8000/api/dossiers/${id}`);
        const data = await response.json();
        setSelectedDossier(data);
        setViewModalVisible(true);
        setCurrentPage(1); // Reset to the first page
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div>
            <center>
                <h1>Liste des Dossiers</h1>
                <button className='create' onClick={handleCreateClick}>
                    <FaPlus />
                </button>
            </center>
            <table>
                <thead>
                    <tr>
                        <th>LTA/BL</th>
                        <th>Client</th>
                        <th>Expéditeur</th>
                        <th>Date d'ouverture</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dossiers.map(dossier => (
                        <tr key={dossier.id_dossier}>
                            <td>{dossier.num_lta_bl}</td>
                            <td>{dossier.provenance}</td>
                            <td>{dossier.exportateur}</td>
                            <td>{dossier.date_ouverture}</td>
                            <td>
                                <button className='view' onClick={() => viewDossier(dossier.id_dossier)}>
                                    <FaEye />
                                </button>
                                <button className='edit' onClick={() => showEditModal(dossier)}>
                                    <FaEdit />
                                </button>
                                <button className='delete' onClick={() => deleteDossier(dossier.id_dossier)}>
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Modifier Dossier</h2>
                        <form onSubmit={submitForm}>
                            {currentPage === 1 && (
                                <>
                                    <div className="form-group">
                                        <label>Exportateur</label>
                                        <input
                                            type="text"
                                            value={form.exportateur}
                                            onChange={(e) => setForm({ ...form, exportateur: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Destinataire</label>
                                        <input
                                            type="text"
                                            value={form.destinataire}
                                            onChange={(e) => setForm({ ...form, destinataire: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date d'ouverture</label>
                                        <input
                                            type="date"
                                            value={form.date_ouverture}
                                            onChange={(e) => setForm({ ...form, date_ouverture: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Provenance</label>
                                        <input
                                            type="text"
                                            value={form.provenance}
                                            onChange={(e) => setForm({ ...form, provenance: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Régime Client</label>
                                        <input
                                            type="text"
                                            value={form.regime_client}
                                            onChange={(e) => setForm({ ...form, regime_client: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-actions">
                                        <button type="button" onClick={nextPage}>Suivant</button>
                                    </div>
                                </>
                            )}
                            {currentPage === 2 && (
                                <>
                                    <div className="form-group">
                                        <label>Mode de Transport</label>
                                        <input
                                            type="text"
                                            value={form.mode_transport}
                                            onChange={(e) => setForm({ ...form, mode_transport: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Numéro DR/GLS</label>
                                        <input
                                            type="text"
                                            value={form.num_dr_gls}
                                            onChange={(e) => setForm({ ...form, num_dr_gls: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Numéro LTA/BL</label>
                                        <input
                                            type="text"
                                            value={form.num_lta_bl}
                                            onChange={(e) => setForm({ ...form, num_lta_bl: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre Total de Colis</label>
                                        <input
                                            type="number"
                                            value={form.nombre_total_colis}
                                            onChange={(e) => setForm({ ...form, nombre_total_colis: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Poids Total Brut</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={form.poids_total_brut}
                                            onChange={(e) => setForm({ ...form, poids_total_brut: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Poids Total Net</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={form.poids_total_net}
                                            onChange={(e) => setForm({ ...form, poids_total_net: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Volume Total</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={form.volume_total}
                                            onChange={(e) => setForm({ ...form, volume_total: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date Estimative d'Arrivée</label>
                                        <input
                                            type="date"
                                            value={form.date_estimative_darrivee}
                                            onChange={(e) => setForm({ ...form, date_estimative_darrivee: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date Réelle d'Arrivée</label>
                                        <input
                                            type="date"
                                            value={form.date_reele_darrivee}
                                            onChange={(e) => setForm({ ...form, date_reele_darrivee: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-actions">
                                        <button type="button" onClick={previousPage}>Précédent</button>
                                        <button type="submit">Sauvegarder</button>
                                    </div>
                                </>
                            )}
                            <button type="button" onClick={() => setModalVisible(false)}>Annuler</button>
                        </form>
                    </div>
                </div>
            )}

            {viewModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Détails du Dossier</h2>
                        {currentPage === 1 && (
                            <>
                                <p><strong>Exportateur:</strong> {selectedDossier.exportateur}</p>
                                <p><strong>Destinataire:</strong> {selectedDossier.destinataire}</p>
                                <p><strong>Date d'ouverture:</strong> {selectedDossier.date_ouverture}</p>
                                <p><strong>Provenance:</strong> {selectedDossier.provenance}</p>
                                <p><strong>Régime Client:</strong> {selectedDossier.regime_client}</p>
                                <p><strong>Mode de Transport:</strong> {selectedDossier.mode_transport}</p>
                                <p><strong>Numéro DR/GLS:</strong> {selectedDossier.num_dr_gls}</p>
                                <div className="form-actions">
                                    <button type="button" onClick={nextPage}>Suivant</button>
                                </div>
                            </>
                        )}
                        {currentPage === 2 && (
                            <>
                                <p><strong>Numéro LTA/BL:</strong> {selectedDossier.num_lta_bl}</p>
                                <p><strong>Nombre Total de Colis:</strong> {selectedDossier.nombre_total_colis}</p>
                                <p><strong>Poids Total Brut:</strong> {selectedDossier.poids_total_brut}</p>
                                <p><strong>Poids Total Net:</strong> {selectedDossier.poids_total_net}</p>
                                <p><strong>Volume Total:</strong> {selectedDossier.volume_total}</p>
                                <p><strong>Description:</strong> {selectedDossier.description}</p>
                                <p><strong>Date Estimative d'Arrivée:</strong> {selectedDossier.date_estimative_darrivee}</p>
                                <p><strong>Date Réelle d'Arrivée:</strong> {selectedDossier.date_reele_darrivee}</p>
                                <div className="form-actions">
                                    <button type="button" onClick={previousPage}>Précédent</button>
                                    <button type="button" onClick={() => setViewModalVisible(false)}>Fermer</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DossierComponent;
