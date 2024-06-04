// src/components/MyFile.js
import React from 'react';
import Sidebar from '../sidebar';
import Files from '../Files';


const MyFile = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Container style={{ marginLeft: 250 }}>
        <Files />
      </Container>
    </div>
  );
};

export default MyFile;
