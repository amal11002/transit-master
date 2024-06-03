import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import './style.css';
import UserDropdown from './UserDropdown';

const reloadUsers = () => {
    fetch('http://localhost:8080/api/users', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.setItem('token'),
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            const filteredUsers = data.data.filter(user => user.email !== 'admin@itsolutionstuff.com');
            setUsers(filteredUsers);
        } else {
            console.error('Failed to fetch user data:', data.message);
        }
    })
    .catch(error => console.error('Error fetching data:', error));
};

const Dashboard = () => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [themeColor, setThemeColor] = useState('default'); // Default theme color
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    
    const navigate = useNavigate();

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
    };
    const handleCloseEditForm = () => {
        setShowEditForm(false);
    };

    const toggleRegistrationForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const changeThemeColor = (theme) => {
        setThemeColor(theme);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized Access',
                text: 'You are not authorized to access this page.',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login');
            return;
        }

        fetch('http://localhost:8080/api/verify-token', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data.status || !data.isAdmin) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized Access',
                    text: 'You are not authorized to access this page.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/login');
                return;
            }

            const userId = sessionStorage.getItem('userId');
            if (!userId) {
                console.error('User ID is missing');
                return;
            }

            fetch(`http://localhost:8080/api/users/${userId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setUser(data.data);
                    
                } else {
                    console.error('Failed to fetch user details:', data.message);
                }
            })
            .catch(error => console.error('Error:', error));

            fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const filteredUsers = data.data.filter(user => user.email !== 'admin@itsolutionstuff.com');
                    setUsers(filteredUsers);
                } else {
                    console.error('Failed to fetch user data:', data.message);
                }
            })
            .catch(error => console.error('Error fetching data:', error))
            
        })
        .catch(error => console.error('Error:', error));
    }, [navigate]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = sessionStorage.setItem('token');
                if (!token) {
                    console.error('No token found in localStorage');
                    return;
                }

                fetch('http://localhost:8080/api/logout', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                })
                .then(response => {
                    if (response.status === 401) {
                        throw new Error('Unauthorized');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status) {
                        localStorage.removeItem('token');
                        Swal.fire({
                            icon: 'success',
                            title: 'Logged Out',
                            text: 'You have been successfully logged out.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            navigate('/login');
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });
    };

    const handleDelete = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if (result.status) {
                        setUsers(users.filter(user => user.id !== userId));
                        Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    } else {
                        Swal.fire('Error!', 'Failed to delete user.', 'error');
                    }
                })
                .catch(error => console.error('Error deleting user:', error));
            }
        });
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
                    <UserDropdown user={user} />
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
      <main id="main-container">
                <div className="bg-body-light">
                    <div className="content content-full">
                        <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center py-2">
                            <div className="flex-grow-1">
                                <h1 className="h3 fw-bold mb-1">
                                    Liste des employés
                                </h1>
                                <h2 className="fs-base lh-base fw-medium text-muted mb-0"></h2>
                            </div>
                            <nav className="flex-shrink-0 mt-3 mt-sm-0 ms-sm-3" aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-alt">
                                    <li className="breadcrumb-item">
                                    <a className="link-fx" href="#" onClick={toggleRegistrationForm}>Ajouter un nouvel utilisateur</a>
                                    {showRegistrationForm && <RegistrationForm toggleRegistrationForm={toggleRegistrationForm} reloadUsers={reloadUsers} />}
            {showRegistrationForm && <div className="modal-overlay"></div>}
            <style>
                {`
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
                        backdrop-filter: blur(5px); /* apply a blur effect to the background */
                        z-index: 1000; /* ensure it's on top of everything else */
                    }

                    .registration-form {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: white;
                        padding: 20px;
                        border-radius: 5px;
                        z-index: 1001; /* ensure it's above the overlay */
                    }

                    .exit-button {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        cursor: pointer;
                    }
                `}
            </style>
                                    </li>
                                    <li className="breadcrumb-item" aria-current="page"></li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="block block-rounded">
                        <div className="block-header block-header-default">
                            <h3 className="block-title"></h3>
                            <div className="block-options">
                                <button type="button" className="btn-block-option">
                                    <i className="si si-settings"></i>
                                </button>
                            </div>
                        </div>
                        <div className="block-content">
                            <p className="fs-sm text-muted"></p>
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-vcenter" id="userTable">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "100px" }}>
                                                <i className="far fa-user"></i>
                                            </th>
                                            <th className="fw-semibold fs-sm" style={{ width: "20%" }}>Name</th>
                                            <th>Surname</th>
                                            <th>Department</th>
                                            <th style={{ width: "20%" }}>Role</th>
                                            <th style={{ width: "40%" }}>Phone Number</th>
                                            <th style={{ width: "20%" }}>Email</th>
                                            <th className="text-center" style={{ width: "100px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
    {users.map(user => (
        <tr key={user.id}>
            <td className="text-center">
                <img className="img-avatar img-avatar48" src="assets/media/avatars/avatar1.jpg" alt="User Avatar" />
            </td>
            <td>{user.name}</td>
                                                <td>{user.surname}</td>
                                                <td>
                                                <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-primary-light text-primary">{user.departement ? user.departement.join(', ') : ''}</span></td>
                                                <td>
                                                <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">{user.role ? user.role.join(', ') : ''}</span></td>
                                                <td>{user.phone_number}</td>
                                                <td>{user.email}</td>
                                                <td>
    <div className="d-flex">
    <button
        onClick={() => {
            setSelectedUser(user);
            setShowEditForm(true);
        }}
        className="btn btn-sm btn-alt-secondary edit-button me-1"
        data-bs-toggle="tooltip"
        title="Edit"
    >
        <i className="fa fa-fw fa-pencil-alt"></i>
    </button>
        <button type="button" className="btn btn-sm btn-alt-secondary delete-button" onClick={() => handleDelete(user.id)} data-bs-toggle="tooltip" title="Delete">
            <i className="fa fa-fw fa-times"></i>
        </button>
    </div>
</td>
        </tr>
    ))}
</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {showEditForm && (
                <EditForm
                    user={selectedUser}
                    toggleEditForm={toggleEditForm}
                    reloadUsers={reloadUsers} // Assuming you have a function to reload users after edit
                    onClose={handleCloseEditForm}
                />
            )}
                
            </main>

            <footer id="page-footer" className="bg-body-light">
                <div className="content py-3">
                    <div className="row fs-sm">
                        {/* Footer content */}
                    </div>
                </div>
            </footer>

        </div>
    );
}

const RegistrationForm = ({ toggleRegistrationForm }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        department: '1', // Default department
        roles: [],
        password: '',
    });

    const updateFormData = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleRoleChange = (e) => {
        const roleId = e.target.value;
        if (formData.roles.includes(roleId)) {
            setFormData({
                ...formData,
                roles: formData.roles.filter((id) => id !== roleId),
            });
        } else {
            setFormData({
                ...formData,
                roles: [...formData.roles, roleId],
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            phone_number: formData.phone,
            password: formData.password,
            role_ids: formData.roles,
            departement_ids: [parseInt(formData.department)], // Ensure this is an integer
        };

        fetch('http://localhost:8080/api/inscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'User created successfully',
                        
                    });
                    
                    // Clear form fields after successful submission
                    setFormData({
                        name: '',
                        surname: '',
                        email: '',
                        phone: '',
                        department: '1',
                        roles: [],
                        password: '',
                    });
                    window.location.reload();

                    
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    });
                    console.error(data.errors);
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred. Please try again.',
                });
                console.error('Error:', error);
            });
    };

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '1001',
            width: '80%',
            maxWidth: '800px',
            fontSize: '1.2em',
        }}>
            <button style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5em',
                cursor: 'pointer',
                color: '#333',
            }} onClick={toggleRegistrationForm}>
                &times;
            </button>
            <form style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} onSubmit={handleSubmit}>
                <div style={{ flex: '1 1 calc(50% - 20px)' }}>
                    <label style={{ marginBottom: '5px', color: '#555' }}>Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        name="name"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ flex: '1 1 calc(50% - 20px)' }}>
                    <label style={{ marginBottom: '5px', color: '#555' }}>Surname:</label>
                    <input
                        type="text"
                        value={formData.surname}
                        onChange={(e) => updateFormData('surname', e.target.value)}
                        name="surname"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ flex: '1 1 calc(50% - 20px)' }}>
                    <label style={{ marginBottom: '5px', color: '#555' }}>Email:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        name="email"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ flex: '1 1 calc(50% - 20px)' }}>
                    <label style={{ marginBottom: '5px', color: '#555' }}>Phone Number:</label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        name="phone"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ flex: '1 1 100%' }}>
                    <label style={{ marginBottom: '5px', color: '#555' }}>Department:</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <input
                                type="radio"
                                value="1"
                                checked={formData.department === '1'}
                                onChange={(e) => updateFormData('department', e.target.value)}
                                id="department1"
                                name="department"
                                style={{ marginRight: '5px' }}
                            />
                            <label htmlFor="department1" style={{ color: '#555' }}>Department Commercial</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="2"
                                checked={formData.department === '2'}
                                onChange={(e) => updateFormData('department', e.target.value)}
                                id="department2"
                                name="department"
                                style={{ marginRight: '5px' }}
                            />
                            <label htmlFor="department2" style={{ color: '#555' }}>Department Operations</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="3"
                                checked={formData.department === '3'}
                                onChange={(e) => updateFormData('department', e.target.value)}
                                id="department3"
                                name="department"
                                style={{ marginRight: '5px' }}
                            />
                            <label htmlFor="department3" style={{ color: '#555' }}>Department Facturations</label>
                        </div>
                    </div>
                </div>
        
                {/* Roles */}
                <div className="col-12" id="roles-container" style={{ flex: '1 1 100%' }}>
                    {formData.department === '1' && (
                        <>
                            <label style={{ marginBottom: '5px', color: '#555' }}></label>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="1"
                                        checked={formData.roles.includes('1')}
                                        onChange={handleRoleChange}
                                        name="role1"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role1" style={{ color: '#555' }}>Chef departement</label>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="7"
                                        checked={formData.roles.includes('7')}
                                        onChange={handleRoleChange}
                                        name="role7"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role7" style={{ color: '#555' }}>Assistant département</label>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="2"
                                        checked={formData.roles.includes('2')}
                                        onChange={handleRoleChange}
                                        name="role2"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role2" style={{ color: '#555' }}>Commercial</label>
                                </div>
                            </div>
                        </>
                    )}
                    {/* Add similar blocks for other departments */}
                    {formData.department === '2' && (
                        <>
                            <label style={{ marginBottom: '5px', color: '#555' }}></label>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="1"
                                        checked={formData.roles.includes('1')}
                                        onChange={handleRoleChange}
                                        name="role1"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role1" style={{ color: '#555' }}>Chef departement</label>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="7"
                                        checked={formData.roles.includes('7')}
                                        onChange={handleRoleChange}
                                        name="role7"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role7" style={{ color: '#555' }}>Assistant département</label>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="3"
                                        checked={formData.roles.includes('3')}
                                        onChange={handleRoleChange}
                                        name="role3"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role2" style={{ color: '#555' }}>Declarant</label>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="4"
                                        checked={formData.roles.includes('4')}
                                        onChange={handleRoleChange}
                                        name="role4"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role4" style={{ color: '#555' }}>Livreur</label>
                                </div>
                                <div style={{ marginRight: '10px' }}> 
                                    <input
                                        type="checkbox"
                                        value="6"
                                        checked={formData.roles.includes('6')}
                                        onChange={handleRoleChange}
                                        name="role6"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role6" style={{ color: '#555' }}>Poursuivant</label>
                                </div>
                                
                            </div>
                        </>
                    )}
                    {formData.department === '3' && (
                        <>
                            <label style={{ marginBottom: '5px', color: '#555' }}></label>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="1"
                                        checked={formData.roles.includes('1')}
                                        onChange={handleRoleChange}
                                        name="role1"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role1" style={{ color: '#555' }}>Chef departement</label>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="7"
                                        checked={formData.roles.includes('7')}
                                        onChange={handleRoleChange}
                                        name="role7"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role7" style={{ color: '#555' }}>Assistant département</label>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <input
                                        type="checkbox"
                                        value="5"
                                        checked={formData.roles.includes('5')}
                                        onChange={handleRoleChange}
                                        name="role5"
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor="role5" style={{ color: '#555' }}>Comptable</label>
                                </div>
                            </div>
                        </>
                    )}
                </div>
        
                <div style={{ flex: '1 1 calc(50% - 20px)', order: 1 }}>
                    <label style={{ marginBottom: '5px', color: '#555' }}>Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        name="password"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                    />
                </div>
                
                <div style={{ flex: '1 1 100%', order: 3, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <button type="submit" style={{
                        padding: '10px 20px',
                        backgroundColor: '#1F456E',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        width: '100%',
                    }} onMouseOver={(e) => e.target.style.backgroundColor = '#1F456E'} onMouseOut={(e) => e.target.style.backgroundColor = '#1F456E'}>
                        Register
                    </button>
                </div>
            </form>
        </div>
        
    );
}
const EditForm = ({ user, departments, roles, updateUser, onClose }) => {
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [department, setDepartment] = useState(user.department);
    const [roleIds, setRoleIds] = useState(user.roles ? user.roles.map(role => role.id) : []);
    const [phone_number, setPhoneNumber] = useState(user.phone_number);
    const [email, setEmail] = useState(user.email);

    const handleEdit = () => {
        const updatedUser = {
            id: user.id,
            name: name,
            surname: surname,
            phone_number: phone_number,
            email: email
        };
        
    
        fetch(`http://localhost:8080/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.setItem('token')
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user.');
            }
            return response.json();
        })
        .then(data => {
            if (data.status) {
                // Update department if it has changed
            if (user.department !== department) {
                const updatedDepartmentData = {
                    departement_ids: [department]
                };
                fetch(`http://localhost:8080/api/users/${user.id}/update-departement`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.setItem('token')
                    },
                    body: JSON.stringify(updatedDepartmentData)
                })
                .then(departmentResponse => {
                    if (!departmentResponse.ok) {
                        throw new Error('Failed to update department.');
                    }
                    return departmentResponse.json();
                })
                .catch(error => {
                    console.error('Error updating department:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to update user department. Please check the console for more details.',
                        icon: 'error'
                    });
                });
            }

            // Update role if it has changed
            if (user.role !== roleIds[0]) {
                const updatedRoleData = {
                    role_ids: roleIds
                };
                fetch(`http://localhost:8080/api/users/${user.id}/update-role`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.setItem('token')
                    },
                    body: JSON.stringify(updatedRoleData)
                })
                .then(roleResponse => {
                    if (!roleResponse.ok) {
                        throw new Error('Failed to update role.');
                    }
                    return roleResponse.json();
                })
                .catch(error => {
                    console.error('Error updating role:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to update user role. Please check the console for more details.',
                        icon: 'error'
                    });
                });
            }

            Swal.fire({
                title: 'Success!',
                text: 'User updated successfully.',
                icon: 'success'
            }).then(() => {
                onClose(); // Close the edit form after saving changes
                window.location.reload();
            });
        } else {
            throw new Error('Failed to update user.');
        }
    })
    .catch(error => {
        console.error('Error updating user:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to update user. Please check the console for more details.',
            icon: 'error'
        });
    });
};
    const handleRoleChange = (roleId) => {
        if (roleIds.includes(roleId)) {
            setRoleIds(roleIds.filter(id => id !== roleId));
        } else {
            // Set roleIds to an array containing only the roleId string
            setRoleIds([...roleIds, roleId]);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="registration-form">
                <button className="exit-button" onClick={onClose}>X</button>
                <h2>Edit User</h2>
                {/* Edit form content here */}
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Surname:</label>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                
                <label>Phone Number:</label>
                <input type="text" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Department:</label>
                <div className="space-x-2">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="1" id="department1" name="department" checked={department === '1'} onChange={() => setDepartment('1')} />
                        <label className="form-check-label" htmlFor="department1">Department Commercial</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="2" id="department2" name="department" checked={department === '2'} onChange={() => setDepartment('2')} />
                        <label className="form-check-label" htmlFor="department2">Department Operations</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="3" id="department3" name="department" checked={department === '3'} onChange={() => setDepartment('3')} />
                        <label className="form-check-label" htmlFor="department3">Department Facturations</label>
                    </div>
                </div>
                <div className="col-12" id="roles-container">
                    {/* Roles will be populated based on the selected department */}
                    <div className="col-12" id="roles-container" style={{ flex: '1 1 100%' }}>
                    {department === '1' && (
    <>
        <label ></label>
        <div>
            <div >
                <input
                    type="checkbox"
                    value="1"
                    checked={roleIds.includes('1')}
                    onChange={() => handleRoleChange('1')}
                    id="role1"
                />
                <label htmlFor="role1" >Chef departement</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    value="7"
                    checked={roleIds.includes('7')}
                    onChange={() => handleRoleChange('7')}
                    id="role7"
                />
                <label htmlFor="role7" >Assistant département</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    value="2"
                    checked={roleIds.includes('2')}
                    onChange={() => handleRoleChange('2')}
                    id="role2"
                />
                <label htmlFor="role2" >Commercial</label>
            </div>
        </div>
    </>
)}

{department === '2' && (
    <>
        <label ></label>
        <div >
            <div>
                <input
                    type="checkbox"
                    value="1"
                    checked={roleIds.includes('1')}
                    onChange={() => handleRoleChange('1')}
                    id="role1"
                />
                <label htmlFor="role1" style={{ color: '#555' }}>Chef departement</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    value="7"
                    checked={roleIds.includes('7')}
                    onChange={() => handleRoleChange('7')}
                    id="role7"
                />
                <label htmlFor="role7" style={{ color: '#555' }}>Assistant département</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    value="3"
                    checked={roleIds.includes('3')}
                    onChange={() => handleRoleChange('3')}
                    id="role3"
                />
                <label htmlFor="role3" style={{ color: '#555' }}>Declarant</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    value="4"
                    checked={roleIds.includes('4')}
                    onChange={() => handleRoleChange('4')}
                    id="role4"
                />
                <label htmlFor="role4" style={{ color: '#555' }}>Livreur</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    value="6"
                    checked={roleIds.includes('6')}
                    onChange={() => handleRoleChange('6')}
                    id="role6"
                />
                <label htmlFor="role6" style={{ color: '#555' }}>Poursuivant</label>
            </div>
            
        </div>
    </>
)}

{department === '3' && (
    <>
        <label ></label>
        <div >
            <div>
                <input
                    type="checkbox"
                    value="1"
                    checked={roleIds.includes('1')}
                    onChange={() => handleRoleChange('1')}
                    id="role1"
                />
                <label htmlFor="role1" style={{ color: '#555' }}>Chef departement</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    value="7"
                    checked={roleIds.includes('7')}
                    onChange={() => handleRoleChange('7')}
                    id="role7"
                />
                <label htmlFor="role7" style={{ color: '#555' }}>Assistant département</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    value="5"
                    checked={roleIds.includes('5')}
                    onChange={() => handleRoleChange('5')}
                    id="role5"
                />
                <label htmlFor="role5" style={{ color: '#555' }}>Comptable</label>
            </div>
        </div>
    </>
)}
                </div>

                </div>
                <button onClick={handleEdit}>Save Changes</button>
            </div>
        </div>
    );
    
};





export default Dashboard;
