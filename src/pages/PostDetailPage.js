import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../services/api';
import styles from './PostDetailPage.module.css';

// PostDetailPage prikazuje detaljan sadrzaj jednog blog posta
// ID posta uzima iz URL parametara i preko API-ja dovlaci podatke
const PostDetailPage = () => {
    const [post, setPost] = useState(null); // cuva trenutno ucitan post
    const [loading, setLoading] = useState(true); // indikator ucitavanja
    const { id } = useParams(); // uzima id iz URL-a

    // useEffect poziva API kada se komponenta ucita ili promeni id
    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetchPostById(id);
                setPost(response.data);
            } catch (error) {
                console.error("Greska prilikom dovlacenja posta:", error);
            } finally {
                setLoading(false);
            }
        };
        getPost();
    }, [id]);

    // Ako se i dalje ucitava
    if (loading) return <p>Ucitavanje posta...</p>;

    // Ako post ne postoji
    if (!post) return <p>Post nije pronadjen.</p>;

    // Ako je sve u redu, prikazi sadrzaj
    return (
        <div className={styles.postContainer}>
            <h1>{post.title}</h1>
            <p className={styles.postContent}>{post.content}</p>
        </div>
    );
};

export default PostDetailPage;