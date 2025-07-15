import React, { useState, useEffect, useRef } from 'react';
import styles from './MyProfile.module.css';

const AddMusicModal = ({ onClose }) => {
    const [showGenreMenu, setShowGenreMenu] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('Select genre');
    const genreRef = useRef(null);

    const genres = ['Hip hop', 'Pop', 'Rock', 'Jazz', 'Electronic', 'Reggae'];

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre);
        setShowGenreMenu(false);
    };

    // ❗ Забороняємо скрол сторінки при відкритті модалки
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (genreRef.current && !genreRef.current.contains(e.target)) {
                setShowGenreMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles['amm-overlay']}>
            <div className={styles['amm-modal']}>
                <div className={styles['amm-left']}>
                    <h3 className={styles['h3']}>Add music</h3>
                    <div className={styles['amm-photo']}></div>
                    <button className={styles['cover-btn']}>+ Cover</button>
                </div>

                <div className={styles['amm-right']}>
                    <input
                        type="text"
                        className={styles['amm-name']}
                        placeholder='Name'
                    />

                    <div className={styles['amm-genre-container']} ref={genreRef}>
                        <div
                            className={styles['amm-genre-selected']}
                            onClick={() => setShowGenreMenu((prev) => !prev)}
                        >
                            <span>{selectedGenre}</span>
                            <span className={styles['amm-arrow']}>
                                {showGenreMenu ? '▲' : '▼'}
                            </span>
                        </div>

                        {showGenreMenu && (
                            <div className={styles['amm-genre-menu']}>
                                {genres.map((genre, index) => (
                                    <div
                                        key={index}
                                        className={styles['amm-genre-item']}
                                        onClick={() => handleSelectGenre(genre)}
                                    >
                                        {genre}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className={styles['music-file']}>Music file</button>
                    <div className={styles['cancel-create']}>
                        <button className={styles['cancel']} onClick={onClose}>Cancel</button>
                        <button className={styles['create']}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMusicModal;
