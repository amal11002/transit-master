import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './components/home';  // Corrected path
// import Register from './components/register';  // Corrected path
// import ProtectedRoute from './components/ProtectedRoute';  // Corrected path
import Login from './login';  // Corrected path
import Dashboard from './dashboard';  // Corrected path
import Register from './register';  // Corrected path
import Departement1 from './departement1';  // Corrected path
import Departement2 from './departement2.js';  // Corrected path
import Departement3 from './departement3.js';  // Corrected path
import MyFile from './components/pages/MyFile'; // Assurez-vous que le chemin est correct
import ListDossier from './components/ListDossier';
import Myform from './components/MyForm'
import Files from './components/Files'; // Assurez-vous que le chemin est correct

import Dossier from './components/pages/Dossier'; // Import correct pour le composant Dossier
import Commercial from './commercial.js';  // Corrected path
import Assistant1 from './assistant1.js';  // Corrected path


import './App.css';  // Assuming the styles are in App.css

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/departement1" element={<Departement1 />} />
         
        <Route path="/Dossier" element={<Dossier />} />
        <Route path="/fichier" element={<MyFile />} />
        <Route path="/lesdossier" element={<ListDossier />} />
          <Route path="/departement2" element={<Departement2 />} />
          <Route path="/departement3" element={<Departement3 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/assistant1" element={<Assistant1 />} />
          {/* <Route path="/register" element={<ProtectedRoute component={Register} />} />
          
          {/* You can add other routes here */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;