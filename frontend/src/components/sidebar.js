import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  width: 200px;
  background-color: black;
  color: white;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const SidebarLink = styled.a`
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarLink href="#">Link 1</SidebarLink>
      <SidebarLink href="#">Link 2</SidebarLink>
      <SidebarLink href="#">Link 3</SidebarLink>
      <SidebarLink href="#">Link 1</SidebarLink>
      <SidebarLink href="#">Link 2</SidebarLink>
      <SidebarLink href="#">Link 3</SidebarLink>
      
    </SidebarWrapper>
  );
};

export default Sidebar;
