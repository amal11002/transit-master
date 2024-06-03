import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './styled.css';
import ProfileDropdown from './ProfileDropdown';

const Departement3 = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
      return;
    }

    const fetchUserData = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            'Authorization': 'Bearer ' + token,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const user = await response.json();
        setUser(user);
        console.log(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const navigateTo = (path) => {
    // Vérifier si l'état utilisateur est vide
    if (Object.keys(user).length === 0) {
      Swal.fire({
          icon: 'info',
          title: 'Chargement en cours...',
          text: 'Veuillez patienter.',
      });
      return;
  }

  const userRole = user.data.role || [];
  let allowed = false;

  switch(path) {
      case '/chef3':
          allowed = userRole.includes('Chef departement');
          break;
      case '/assistant3':
          allowed = userRole.includes('Assistant departement') || userRole.includes('Chef departement');
          break;
      case '/comptable':
          allowed = userRole.includes('Comptable') || userRole.includes('Chef departement');
          break;
      default:
          allowed = false;
  }

  if (allowed) {
      navigate(path);
  } else {
      Swal.fire({
          icon: 'error',
          title: 'Accès refusé',
          text: 'Vous n\'êtes pas autorisé à accéder à cette page.',
      });
  }
  };

  return (
    <div id="page-container" className="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed main-content-narrow">
      {/* Sidebar and header code remains the same */}
      <nav id="sidebar" aria-label="Main Navigation">
        {/* Sidebar content remains the same */}
        <div className="js-sidebar-scroll">
          <div className="content-side">
            <ul className="nav-main">
              <li className="nav-main-item">
                <a className="nav-main-link" href="be_pages_dashboard.html">
                  <i className="nav-main-link-icon si si-speedometer"></i>
                  <span className="nav-main-link-name">Dashboard</span>
                </a>
              </li>
              <li className="nav-main-heading">Departement commercial</li>
              <li className="nav-main-item">
                <a
                  className="nav-main-link"
                  href="#!"
                  onClick={() => navigateTo('/chef3')}
                >
                  <i className="nav-main-link-icon si si-energy"></i>
                  <span className="nav-main-link-name">Chef departement</span>
                </a>
              </li>
              <li className="nav-main-item">
                <a
                  className="nav-main-link"
                  href="#!"
                  onClick={() => navigateTo('/assistant3')}
                >
                  <i className="nav-main-link-icon si si-energy"></i>
                  <span className="nav-main-link-name">Assistant département</span>
                </a>
              </li>
              <li className="nav-main-item">
                <a
                  className="nav-main-link"
                  href="#!"
                  onClick={() => navigateTo('/comptable')}
                >
                  <i className="nav-main-link-icon si si-energy"></i>
                  <span className="nav-main-link-name">Comptable</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header id="page-header">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <button type="button" className="btn btn-sm btn-alt-secondary me-2 d-lg-none" data-toggle="layout" data-action="sidebar_toggle">
              <i className="fa fa-fw fa-bars"></i>
            </button>
            <button type="button" className="btn btn-sm btn-alt-secondary d-md-none" data-toggle="layout" data-action="header_search_on">
              <i className="fa fa-fw fa-search"></i>
            </button>
          </div>
          <div className="d-flex align-items-center">
            <ProfileDropdown user={user} />
          </div>
        </div>

        <div id="page-header-search" className="overlay-header bg-body-extra-light">
          <div className="content-header">
            <form className="w-100" method="POST">
              <div className="input-group input-group-sm">
                <input type="text" className="form-control form-control-alt" placeholder="Search or hit ESC.." id="page-header-search-input" name="page-header-search-input" />
                <button type="button" className="btn btn-alt-secondary" data-toggle="layout" data-action="header_search_off">
                  <i className="fa fa-fw fa-times"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div id="page-header-loader" className="overlay-header bg-primary-lighter">
          <div className="content-header">
            <div className="w-100 text-center">
              <i className="fa fa-fw fa-sun fa-spin text-primary"></i>
            </div>
          </div>
        </div>
      </header>

      <main id="main-container">
        <div className="bg-primary-dark">
          <div className="content content-full text-center pt-7 pb-5">
            <h1 className="h2 text-white mb-2">
              Bienvenue dans la page du departement facturations
            </h1>
          </div>
        </div>
        <div className="custom-content">
  <div className="custom-row">
    <div className="custom-col">
      <a className="custom-block custom-block-rounded custom-block-link-pop custom-bg-dusk"  onClick={() => navigateTo('/chef3')}>
        <div className="custom-block-content custom-block-content-full custom-text-center" onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#000'}>
          <div className="custom-item custom-item-circle custom-bg-black-25">
            <i className="fa fa-users custom-text-white"></i>
          </div>
          <p className="custom-text-white custom-fs-lg custom-mt-3 custom-mb-0">
            Chef département
          </p>
          <p className="custom-text-white-75 custom-mb-0">
            Département facturations
          </p>
        </div>
      </a>
    </div>
    <div className="custom-col">
      <a className="custom-block custom-block-rounded custom-block-link-pop custom-bg-sea"  onClick={() => navigateTo('/assistant3')}>
        <div className="custom-block-content custom-block-content-full custom-text-center">
          <div className="custom-item custom-item-circle custom-bg-black-25">
            <i className="fa fa-handshake custom-text-white"></i>
          </div>
          <p className="custom-text-white custom-fs-lg custom-mt-3 custom-mb-0">
            Assistant département
          </p>
          <p className="custom-text-white-75 custom-mb-0">
            Sous la responsabilité du chef de département
          </p>
        </div>
      </a>
    </div>
    <div className="custom-col">
      <a className="custom-block custom-block-rounded custom-block-link-pop custom-bg-fruit"  onClick={() => navigateTo('/comptable')}>
        <div className="custom-block-content custom-block-content-full custom-text-center">
          <div className="custom-item custom-item-circle custom-bg-black-25">
            <i className="fa fa-chart-bar custom-text-white"></i>
          </div>
          <p className="custom-text-white custom-fs-lg custom-mt-3 custom-mb-0">
            Comptable
          </p>
          <p className="custom-text-white-75 custom-mb-0">
            Sous la responsabilité du chef de département
          </p>
        </div>
      </a>
    </div>
  </div>
</div>


      </main>

      <footer id="page-footer" className="bg-body-light">
        <div className="content py-3">
          <div className="row fs-sm">
            <div className="col-sm-6 order-sm-1 text-center text-sm-start">
              <a className="fw-semibold" href="https://1.envato.market/ydb" target="_blank" rel="noreferrer">Transit Master</a> &copy; <span data-toggle="year-copy"></span>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Departement3;
