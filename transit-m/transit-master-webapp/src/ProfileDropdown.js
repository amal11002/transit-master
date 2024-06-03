
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
import './ProfileDropdown.css'; // Import your CSS file for styling

const ProfileDropdown = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error('No token found in sessionStorage');
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
                        sessionStorage.removeItem('token');
                        Swal.fire({
                            icon: 'success',
                            title: 'Logged Out',
                            text: 'You have been successfully logged out.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.href = '/login';
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });
    };

    // Check if user is defined before accessing user.data
    const userName = user && user.data ? user.data.name : 'User';
    const userRole = user && user.data && user.data.role ? user.data.role.join(', ') : '';

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button
                type="button"
                className="dropdown-button"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                {userName}
                <i className={`fa fa-fw fa-angle-${isOpen ? 'up' : 'down'}`}></i>
            </button>
            <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                <div>
                    <p>{userName}</p>
                    <p>{userRole}</p>
                </div>
                <div>
                    <a href="#" onClick={handleLogout}>Log Out</a>
                </div>
            </div>
        </div>
    );
};


export default ProfileDropdown;