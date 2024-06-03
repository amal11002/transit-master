import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DepartmentcommercialMenu.css';
const DepartmentcommercialMenu = ({ isSubMenuOpen, toggleSubMenu }) => (
    <>
      <a
        className="nav-main-link nav-main-link-submenu"
        href="#"
        onClick={toggleSubMenu}
        aria-expanded={isSubMenuOpen ? 'true' : 'false'}
      >
        <i className="nav-main-link-icon si si-energy"></i>
        <span className="nav-main-link-name">Departement commercial</span>
      </a>
      <ul className={`nav-main-submenu ${isSubMenuOpen ? 'show' : ''}`}>
        <li>
          <a href="#">Chef departement</a>
        </li>
        <li>
          <a href="#">Assistant département</a>
        </li>
        <li>
          <a href="#">Commercial</a>
        </li>
      </ul>
    </>
  );
  

export default DepartmentcommercialMenu;
