import React from 'react'
import styled from 'styled-components';
import MyForm from './components/MyForm';


const Wrapper = styled.div`
  display: flex;
`;
const Commercial = () =>{
    return (
        <Wrapper>
    
          {/* Ajoutez le formulaire ici */}
          <MyForm />
        </Wrapper>
      );
}

export default Commercial
