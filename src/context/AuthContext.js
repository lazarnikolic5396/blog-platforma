import React, { createContext, useState, useContext, useEffect } from 'react';

// Kreiramo kontekst za autentikaciju
const AuthContext = createContext(null);

// AuthProvider obuhvata celu aplikaciju i cuva podatke o korisniku
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Kada se aplikacija pokrene, proveravamo da li u localStorage postoji sacuvan korisnik
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Funkcija login -> cuva korisnika u localStorage i azurira state
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    // Funkcija logout -> brise korisnika iz localStorage i postavlja state na null
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // Vrednosti koje kontekst nudi svima koji ga koriste
    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook za koriscenje konteksta, da bude lakse pozivanje
export const useAuth = () => {
    return useContext(AuthContext);
};
