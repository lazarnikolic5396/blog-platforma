import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

// Header komponenta prikazuje navigaciju aplikacije.
// Sadrzi linkove za Home, Admin Dashboard (samo za admina),
// kao i opcije za prijavu/registraciju ili odjavu ako je korisnik ulogovan.
const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Funkcija za odjavu korisnika
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.navLinks}>
                    <Link to="/">Pocetna</Link>
                    {/* Link za admin panel samo ako je korisnik admin */}
                    {user && user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
                </div>

                <div className={styles.userActions}>
                    {user ? (
                        <>
                            <span>Dobrodosao, {user.username}</span>
                            <button onClick={handleLogout}>Odjava</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Prijava</Link>
                            <Link to="/register">Registracija</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;