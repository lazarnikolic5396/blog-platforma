import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// AdminRoute komponenta kontrolise pristup admin stranici
// Ako korisnik nije ulogovan, preusmerava ga na login
// Ako je ulogovan ali nema admin ulogu, preusmerava ga na pocetnu
// Samo admin korisnik moze da vidi child komponente
const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    // Ako korisnik nije ulogovan -> login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Ako korisnik nije admin -> pocetna
    if (user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    // Ako je sve u redu -> prikazi child
    return children;
};

export default AdminRoute;