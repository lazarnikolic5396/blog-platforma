import React from 'react';
import styles from './Modal.module.css';

// Modal komponenta sluzi za prikazivanje popup prozora preko sadrzaja stranice.
// Prima sledece props:
// - show: da li je modal otvoren ili ne
// - onClose: funkcija koja zatvara modal
// - title: naslov modala
// - children: sadrzaj koji ide unutar tela modala
const Modal = ({ show, onClose, title, children }) => {
    // Ako je show = false, modal se ne prikazuje
    if (!show) {
        return null;
    }

    return (
        // Pozadina modala, klik na nju zatvara modal
        <div className={styles.modalBackdrop} onClick={onClose}>
            {/* Glavni kontejner modala, klik unutar njega NE zatvara modal */}
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.modalTitle}>{title}</h4>
                    {/* Dugme za zatvaranje (X) */}
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>
                {/* Glavni deo tela modala */}
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;