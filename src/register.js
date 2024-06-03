import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';


const Register = () =>  {

   const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [themeColor, setThemeColor] = useState('default'); // Default theme color
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const toggleRegistrationForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const changeThemeColor = (theme) => {
        setThemeColor(theme);
    };
  return (
    
       <div id="page-container" className={`sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed main-content-narrow ${darkMode ? 'dark-mode' : ''}`}>

<aside id="side-overlay">
    <div className="content-header border-bottom"></div>
    





    <a className="img-link me-1" >
        <img className="img-avatar img-avatar32" src="assets/media/avatars/avatar10.jpg" alt="" />
    </a>
    <div className="content-side"></div>
</aside>

<nav id="sidebar" aria-label="Main Navigation">
<div className="content-header">

<a className="fw-semibold text-dual" href="index.html">
<span className="smini-visible">
<i className="fa fa-circle-notch text-primary"></i>
</span>
<span className="smini-hide fs-5 tracking-wider">Transit Master</span>
</a>
<div>
<button type="button" className="btn btn-sm btn-alt-secondary" data-toggle="layout" data-action="dark_mode_toggle" onClick={toggleDarkMode}>
    <i className="far fa-moon"></i>
    {/* Visually hide the button text */}
    <span className="visually-hidden">Toggle Dark Mode</span>
</button>
<div className="dropdown d-inline-block ms-1">
<button type="button" className="btn btn-sm btn-alt-secondary" id="sidebar-themes-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fa fa-brush"></i>
    </button>
    <div className="dropdown-menu dropdown-menu-end fs-sm smini-hide border-0" aria-labelledby="sidebar-themes-dropdown">
    <a className="dropdown-item" onClick={() => changeThemeColor('default')} href="#">
            Default
        </a>
        <a className="dropdown-item" onClick={() => changeThemeColor('amethyst')} href="#">
            Amethyst
        </a>
<a className="dropdown-item d-flex align-items-center justify-content-between fw-medium" data-toggle="theme" data-theme="assets/css/themes/city.min.css" href="#">
<span>City</span>
<i className="fa fa-circle text-city"></i>
</a>
<a className="dropdown-item d-flex align-items-center justify-content-between fw-medium" data-toggle="theme" data-theme="assets/css/themes/flat.min.css" href="#">
<span>Flat</span>
<i className="fa fa-circle text-flat"></i>
</a>
<a className="dropdown-item d-flex align-items-center justify-content-between fw-medium" data-toggle="theme" data-theme="assets/css/themes/modern.min.css" href="#">
<span>Modern</span>
<i className="fa fa-circle text-modern"></i>
</a>
<a className="dropdown-item d-flex align-items-center justify-content-between fw-medium" data-toggle="theme" data-theme="assets/css/themes/smooth.min.css" href="#">
<span>Smooth</span>
<i className="fa fa-circle text-smooth"></i>
</a>
<div className="dropdown-divider"></div>
<a className="dropdown-item fw-medium" data-toggle="layout" data-action="sidebar_style_light" href="javascript:void(0)">
<span>Sidebar Light</span>
</a>
<a className="dropdown-item fw-medium" data-toggle="layout" data-action="sidebar_style_dark" href="javascript:void(0)">
<span>Sidebar Dark</span>
</a>
<div className="dropdown-divider"></div>
<a className="dropdown-item fw-medium" data-toggle="layout" data-action="header_style_light" href="javascript:void(0)">
<span>Header Light</span>
</a>
<a className="dropdown-item fw-medium" data-toggle="layout" data-action="header_style_dark" href="javascript:void(0)">
<span>Header Dark</span>
</a>
</div>
</div>
<a className="d-lg-none btn btn-sm btn-alt-secondary ms-1" data-toggle="layout" data-action="sidebar_close" href="javascript:void(0)">
<i className="fa fa-fw fa-times"></i>
</a>
</div>
</div>
<div className="js-sidebar-scroll">
<div className="content-side">
<ul className="nav-main">
<li className="nav-main-item">
<a className="nav-main-link" href="be_pages_dashboard.html">
<i className="nav-main-link-icon si si-speedometer"></i>
<span className="nav-main-link-name">Dashboard</span>
</a>
</li>
</ul>
</div>
</div>
</nav>


<header id="page-header">
    {/* Header Content */}
    <div className="content-header">
        {/* Left Section */}
        <div className="d-flex align-items-center">
            {/* Toggle Sidebar */}
            {/* Layout API, functionality initialized in Template._uiApiLayout()*/}
            <button type="button" className="btn btn-sm btn-alt-secondary me-2 d-lg-none" data-toggle="layout" data-action="sidebar_toggle">
                <i className="fa fa-fw fa-bars"></i>
            </button>
            {/* END Toggle Sidebar */}

            {/* Open Search Section (visible on smaller screens) */}
            {/* Layout API, functionality initialized in Template._uiApiLayout() */}
            <button type="button" className="btn btn-sm btn-alt-secondary d-md-none" data-toggle="layout" data-action="header_search_on">
                <i className="fa fa-fw fa-search"></i>
            </button>
            {/* END Open Search Section */}

            {/* Search Form (visible on larger screens) */}
            <form className="d-none d-md-inline-block" action="be_pages_generic_search.html" method="POST">
                <div className="input-group input-group-sm">
                    <input type="text" className="form-control form-control-alt" placeholder="Search.." id="page-header-search-input2" name="page-header-search-input2" />
                    <span className="input-group-text border-0">
                        <i className="fa fa-fw fa-search"></i>
                    </span>
                </div>
            </form>
            {/* END Search Form */}
        </div>
        {/* END Left Section */}

        {/* Right Section */}
        <div className="d-flex align-items-center">
            {/* User Dropdown */}
             {/* User Dropdown */}
             <div className="dropdown d-inline-block ms-2">
                <button type="button" className="btn btn-sm btn-alt-secondary d-flex align-items-center" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="rounded-circle" src="assets/media/avatars/avatar10.jpg" alt="Header Avatar" style={{ width: '21px' }} />
                    <span className="d-none d-sm-inline-block ms-2">{user ? user.name : ''}</span>
                    <i className="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0" aria-labelledby="page-header-user-dropdown">
                    <div className="p-3 text-center bg-body-light border-bottom rounded-top">
                        <img className="img-avatar img-avatar48 img-avatar-thumb" src="assets/media/avatars/avatar10.jpg" alt="" />
                        <p className="mt-2 mb-0 fw-medium">{user.name}</p>
                        <p className="mt-2 mb-0 fw-medium">{user.role ? user.role.join(', ') : ''}</p>
                    </div>
                    <div className="p-2">
                        <a id="logout-link" className="dropdown-item d-flex align-items-center justify-content-between" href="#">
                            <span className="fs-sm fw-medium">Log Out</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        {/* END Right Section */}

        {/* Header Search */}
        <div id="page-header-search" className="overlay-header bg-body-extra-light">
            <div className="content-header">
                <form className="w-100" action="be_pages_generic_search.html" method="POST">
                    <div className="input-group">
                        {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                        <button type="button" className="btn btn-alt-danger" data-toggle="layout" data-action="header_search_off">
                            <i className="fa fa-fw fa-times-circle"></i>
                        </button>
                        <input type="text" className="form-control" placeholder="Search or hit ESC.." id="page-header-search-input" name="page-header-search-input" />
                    </div>
                </form>
            </div>
        </div>
        {/* END Header Search */}

        {/* Header Loader */}
        {/* Please check out the Loaders page under Components category to see examples of showing/hiding it */}
        <div id="page-header-loader" className="overlay-header bg-body-extra-light">
            <div className="content-header">
                <div className="w-100 text-center">
                <i className="fa fa-fw fa-circle-notch fa-spin"></i>
  </div>
</div>
</div>
{/* END Header Loader */}
</div>
{/* END Header Content */}
</header>
{/* END Header */}
    </div>
  )
}

export default Register
