import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../services/api';
import styles from './HomePage.module.css';

// HomePage prikazuje listu svih postova iz baze
// Koristi useEffect da pozove API i ucita podatke pri pokretanju
const HomePage = () => {
    const [posts, setPosts] = useState([]);   // cuvamo sve postove
    const [loading, setLoading] = useState(true); // indikator ucitavanja

    // useEffect -> dovlaci postove kada se komponenta ucita
    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetchPosts();
                setPosts(response.data);
            } catch (error) {
                console.error("Greska prilikom dovlacenja postova:", error);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, []);

    // Ako se postovi jos ucitavaju
    if (loading) return <p>Ucitavanje postova...</p>;

    // Prikaz liste postova
    return (
        <div>
            <h1>Lista postova</h1>
            <div>
                {posts.map((post) => (
                    <article key={post.id} className={styles.postCard}>
                        {/* Naslov posta sa linkom ka detaljima */}
                        <h2 className={styles.postTitle}>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </h2>
                        {/* Kratak uvod iz sadrzaja posta */}
                        <p className={styles.postExcerpt}>
                            {post.content.substring(0, 150)}...
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default HomePage;