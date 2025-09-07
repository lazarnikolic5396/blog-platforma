import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../pages/Form.module.css'; // Koristimo iste stilove kao i za forme

// PostForm se koristi u Admin Dashboardu za kreiranje ili izmenu posta.
// Ako postoji initialData -> forma radi update, u suprotnom kreira novi post.
const PostForm = ({ initialData, onSubmit, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            title: initialData?.title || '',   // naslov posta
            content: initialData?.content || '', // sadrzaj posta
        },
        enableReinitialize: true, // azurira formu kada se promeni initialData
        validationSchema: Yup.object({
            title: Yup.string().required('Naslov je obavezan'),
            content: Yup.string().required('Sadrzaj je obavezan'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            onSubmit(values); // poziva funkciju iz parent komponente
            setSubmitting(false);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>Naslov</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    {...formik.getFieldProps('title')}
                    className={styles.input}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className={styles.error}>{formik.errors.title}</div>
                ) : null}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="content" className={styles.label}>Sadrzaj</label>
                <textarea
                    id="content"
                    name="content"
                    rows="10"
                    {...formik.getFieldProps('content')}
                    className={styles.input}
                />
                {formik.touched.content && formik.errors.content ? (
                    <div className={styles.error}>{formik.errors.content}</div>
                ) : null}
            </div>

            {/* Dugme menja labelu u zavisnosti da li je edit ili create */}
            <button type="submit" disabled={formik.isSubmitting}>
                {initialData ? 'Azuriraj post' : 'Napravi post'}
            </button>
            <button
                type="button"
                onClick={onCancel}
                style={{ marginLeft: '10px', backgroundColor: 'var(--secondary-color)' }}
            >
                Odustani
            </button>
        </form>
    );
};

export default PostForm;