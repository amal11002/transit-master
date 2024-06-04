// src/components/pages/SidebarView.js
import React from 'react';
import Sidebar from './sidebar';

const SidebarView = () => {
  return (
    <div className="App">
        <sidebar/>
     
      <div className="content">
        <h1>Sidebar Only View</h1>
        
        {/* Vous pouvez ajouter plus de contenu ici si nécessaire */}
      </div>
    </div>
  );
};

export default SidebarView;
