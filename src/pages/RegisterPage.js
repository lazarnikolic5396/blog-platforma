import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../services/api';
import styles from './Form.module.css';

// RegisterPage prikazuje formu za registraciju novih korisnika
// Koristi Formik za rad sa formama i Yup za validaciju
const RegisterPage = () => {
    const navigate = useNavigate();

    // Konfiguracija Formik-a
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Mora imati 15 karaktera ili manje')
                .required('Korisnicko ime je obavezno'),
            email: Yup.string()
                .email('Email nije validan')
                .required('Email je obavezan'),
            password: Yup.string()
                .min(6, 'Lozinka mora imati bar 6 karaktera')
                .required('Lozinka je obavezna'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                // Novi korisnik dobija rolu user
                const userData = { ...values, role: 'user' };
                await registerUser(userData);
                alert('Registracija uspesna! Prijavite se.');
                navigate('/login');
            } catch (error) {
                console.error('Registracija nije uspela:', error);
                alert('Doslo je do greske prilikom registracije.');
            }
            setSubmitting(false);
        },
    });

    return (
        <div className={styles.formContainer}>
            <h2>Registracija</h2>
            <form onSubmit={formik.handleSubmit}>
                {/* Polje za korisnicko ime */}
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Korisnicko ime</label>
                    <input
                        id="username"
                        type="text"
                        {...formik.getFieldProps('username')}
                        className={styles.input}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className={styles.error}>{formik.errors.username}</div>
                    ) : null}
                </div>

                {/* Polje za email */}
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email adresa</label>
                    <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                        className={styles.input}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={styles.error}>{formik.errors.email}</div>
                    ) : null}
                </div>

                {/* Polje za lozinku */}
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Lozinka</label>
                    <input
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                        className={styles.input}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className={styles.error}>{formik.errors.password}</div>
                    ) : null}
                </div>

                <button type="submit" disabled={formik.isSubmitting}>
                    Registruj se
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;