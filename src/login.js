import { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.email) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (!inputs.password) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    setLoading(true);

    fetch('http://localhost:8080/api/connexion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
    .then(response => response.json())
    .then(data => {
      setLoading(false);

      if (data.status) {
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'Redirecting...',
          showConfirmButton: false,
          timer: 1500
          
        });

        sessionStorage.setItem('userId', data.id);
      sessionStorage.setItem('token', data.token);
        fetch('http://localhost:8080/api/check-admin', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(adminData => {
          if (adminData.isAdmin) {
            window.location.href = '/dashboard';
          } else {
            fetch('http://localhost:8080/api/check-roleanddepartement', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json',
              },
            })
            .then(response => response.json())
            .then(roleDeptData => {
              if (roleDeptData.status && roleDeptData.department) {
                const departmentId = Object.keys(roleDeptData.department)[0];
                switch(departmentId) {
                  case '1':
                    window.location.href = '/departement1';
                    break;
                  case '2':
                    window.location.href = '/departement2';
                    break;
                  default:
                    window.location.href = '/departement3';
                    break;
                }
              } else {
                console.error('Invalid department data:', roleDeptData.departement);
                // Handle error
              }
            })
            .catch(error => {
              console.error('Error fetching role and department:', error);
              // Handle error
            });
          }
        })
        .catch(error => {
          console.error('Error checking admin status:', error);
          // Handle error
        });
      } else {
        // Show error message
        // Handle error
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error
    });
  };

  return (
    <div className="main-layout">
      <div id="page-container">
        <main id="main-container">
          <div className="hero-static d-flex align-items-center">
            <div className="content">
              <div className="row justify-content-center push">
                <div className="col-md-8 col-lg-6 col-xl-4">
                  <div className="block block-rounded mb-0">
                    <div className="block-header block-header-default">
                      <h3 className="block-title">Connectez vous!</h3>
                      <div className="block-options"></div>
                    </div>
                    <div className="block-content">
                      <div className="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
                        <h1 className="h2 mb-1">Transit Master</h1>
                        <p className="fw-medium text-muted">Bienvenue, veuillez vous connecter.</p>

                        <form onSubmit={handleSubmit} id="login-form" className="js-validation-signin">
                          <div className="py-3">
                            <div className="mb-4">
                              <input
                                type="text"
                                className="form-control form-control-alt form-control-lg"
                                id="login-username"
                                name="email"
                                placeholder="Email"
                                value={inputs.email}
                                onChange={handleInput}
                              />
                              {emailError && <span className="text-danger">Please enter the email</span>}
                            </div>
                            <div className="mb-4">
                              <input
                                type="password"
                                className="form-control form-control-alt form-control-lg"
                                id="login-password"
                                name="password"
                                placeholder="Mot de passe"
                                value={inputs.password}
                                onChange={handleInput}
                              />
                              {passwordError && <span className="text-danger">Please enter the password</span>}
                            </div>
                            <div className="mb-4">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="login-remember" name="login-remember"/>
                                <label className="form-check-label" htmlFor="login-remember">Remember Me</label>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-md-6 col-xl-5">
                              {loading ? (
                                <div className="spinner-border text-success"></div>
                              ) : (
                                <button type="submit" className="btn w-100 btn-alt-primary">
                                  <i className="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i> Sign In
                                </button>
                              )}
                            </div>
                          </div>
                        </form>
                        <div id="login-error" className="text-danger" style={{ display: 'none' }}>Invalid login credentials.</div>
                      </div>
                    </div>
                  </div>
                  <div className="fs-sm text-muted text-center">
                    <strong>Transit </strong> &copy; <span data-toggle="year-copy"></span>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;