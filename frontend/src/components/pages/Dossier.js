import React from 'react';
import styled from 'styled-components';

import MyForm from '../MyForm'; // Importez le composant du formulaire

const Wrapper = styled.div`
  display: flex;
`;

const Dossier = () => {
  return (
    <Wrapper>

      {/* Ajoutez le formulaire ici */}
      <MyForm />
    </Wrapper>
  );
};

export default Dossier;
