import React, { useState, useEffect } from 'react';
import { fetchPosts, deletePost, createPost, updatePost, fetchLoginActivities } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import PostForm from '../components/PostForm';
import styles from './AdminDashboard.module.css';

// AdminDashboard je centralno mesto za rad admina:
// - tab "Postovi": CRUD nad postovima (kreiranje, izmena, brisanje)
// - tab "Aktivnosti": pregled najskorijih prijava korisnika
const AdminDashboard = () => {
    // Aktivni tab: 'posts' ili 'activity'
    const [activeTab, setActiveTab] = useState('posts');

    // Stanja za rad sa postovima
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    // Trenutno ulogovan korisnik (ocekujemo da je admin)
    const { user } = useAuth();

    // Stanje za login aktivnosti
    const [activities, setActivities] = useState([]);

    // Kada se menja tab, ucitavamo odgovarajuce podatke
    useEffect(() => {
        if (activeTab === 'posts') {
            loadPosts();
        } else if (activeTab === 'activity') {
            loadActivities();
        }
    }, [activeTab]);

    // Ucitavanje postova sa servera
    const loadPosts = async () => {
        try {
            const response = await fetchPosts();
            setPosts(response.data);
        } catch (error) {
            console.error('Greska pri ucitavanju postova:', error);
        }
    };

    // Ucitavanje aktivnosti prijave sa servera
    const loadActivities = async () => {
        try {
            const response = await fetchLoginActivities();
            setActivities(response.data);
        } catch (error) {
            console.error('Greska pri ucitavanju aktivnosti:', error);
        }
    };

    // Brisanje posta uz potvrdu korisnika
    const handleDelete = async (id) => {
        if (window.confirm('Da li sigurno zelis da obrises ovaj post?')) {
            try {
                await deletePost(id);
                loadPosts(); // osvezi tabelu nakon brisanja
            } catch (error) {
                console.error('Brisanje nije uspelo:', error);
                alert('Nije moguce obrisati post.');
            }
        }
    };

    // Otvaranje modala za kreiranje novog posta
    const handleOpenModalForNew = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    };

    // Otvaranje modala za izmenu postojeceg posta
    const handleOpenModalForEdit = (post) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    // Zatvaranje modala i reset stanja
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPost(null);
    };

    // Submit iz forme (kreiranje ili azuriranje)
    const handleFormSubmit = async (postData) => {
        try {
            if (editingPost) {
                // Azuriranje postojeceg posta
                await updatePost(editingPost.id, { ...editingPost, ...postData });
            } else {
                // Kreiranje novog posta
                const newPost = {
                    ...postData,
                    authorId: user.id,
                    createdAt: new Date().toISOString(),
                };
                await createPost(newPost);
            }
            loadPosts();     // osvezi listu
            handleCloseModal(); // zatvori modal
        } catch (error) {
            console.error('Cuvanje posta nije uspelo:', error);
            alert('Nije moguce sacuvati post.');
        }
    };

    return (
        <>
            {/* Modal za kreiranje/izmenu posta */}
            <Modal
                show={isModalOpen}
                onClose={handleCloseModal}
                title={editingPost ? 'Izmeni post' : 'Napravi novi post'}
            >
                <PostForm
                    initialData={editingPost}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseModal}
                />
            </Modal>

            <div className={styles.dashboardContainer}>
                <h1>Admin Panel</h1>

                {/* Navigacija izmedju tabova */}
                <div className={styles.tabNav}>
                    <button
                        className={activeTab === 'posts' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('posts')}
                    >
                        Upravljanje postovima
                    </button>
                    <button
                        className={activeTab === 'activity' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('activity')}
                    >
                        Aktivnosti prijave
                    </button>
                </div>

                {/* Tab: Postovi */}
                {activeTab === 'posts' && (
                    <div>
                        <button onClick={handleOpenModalForNew} style={{ marginTop: '1rem' }}>
                            Dodaj novi post
                        </button>

                        <table className={styles.postsTable}>
                            <thead>
                                <tr>
                                    <th>Naslov</th>
                                    <th>Akcije</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.title}</td>
                                        <td>
                                            <button onClick={() => handleOpenModalForEdit(post)}>Izmeni</button>
                                            <button onClick={() => handleDelete(post.id)} className="danger">
                                                Obrisi
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Tab: Aktivnosti prijave */}
                {activeTab === 'activity' && (
                    <div>
                        <h2>Skorasnje prijave korisnika</h2>
                        <table className={styles.postsTable}>
                            <thead>
                                <tr>
                                    <th>Korisnicko ime</th>
                                    <th>Vreme prijave</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((activity) => (
                                    <tr key={activity.id}>
                                        <td>{activity.username}</td>
                                        <td>{new Date(activity.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;
