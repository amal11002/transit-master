import React from 'react';
import styled from 'styled-components';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import MyForm from '../MyForm'; // Importez le composant du formulaire

const Wrapper = styled.div`
  display: flex;
`;

const Dossier = () => {
  return (
    <Wrapper>
      <Topbar /> {/* Gardez le Topbar avant le Sidebar */}
      <Sidebar />
      {/* Ajoutez le formulaire ici */}
      <MyForm />
    </Wrapper>
  );
};

export default Dossier;
