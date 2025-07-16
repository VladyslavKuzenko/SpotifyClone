import React, { useState, useEffect, useRef } from 'react';
import styles from './MyProfile.module.css';

const AddAlbumModal = ({ onClose }) => {
    const [showGenreMenu, setShowGenreMenu] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('Select genre');
    const genreRef = useRef(null);

    const [songs, setSongs] = useState([{ id: Date.now() }]);

    const genres = ['Hip hop', 'Pop', 'Rock', 'Jazz', 'Electronic', 'Reggae'];

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre);
        setShowGenreMenu(false);
    };

    const addSong = () => {
        setSongs(prev => [...prev, { id: Date.now() }]);
    };

    const removeSong = (id) => {
        setSongs(prev => prev.filter(song => song.id !== id));
    };

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
            <div className={styles['abm-modal']}>
                <div className={styles['amm-left']}>
                    <h3 className={styles['h3']}>Add album</h3>
                    <div className={styles['amm-photo']}></div>
                    <button className={styles['cover-btn']}>+ Cover</button>
                </div>

                <div className={styles['amm-right']}>
                    <input
                        type="text"
                        className={styles['amm-name']}
                        placeholder='Name of album'
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

                    <div className={styles['songs-array']}>
                        {songs.map((song, index) => (
                            <div key={song.id} className={styles['songs-svyazka']}>
                                <input
                                    type="text"
                                    className={styles['songname']}
                                    placeholder={`Name of song #${index + 1}`}
                                />
                                <div className={styles['music-delete']}>

                                    <button className={styles['music-file']}>Music file</button>
                                    <button className={styles['delete-song-btn']} onClick={() => removeSong(song.id)}>×</button>
                                </div>

                            </div>
                        ))}

                        <button
                            className={styles['add-song-btn']}
                            onClick={addSong}
                        >
                            +
                        </button>
                    </div>

                    <div className={styles['cancel-create']}>
                        <button className={styles['cancel']} onClick={onClose}>Cancel</button>
                        <button className={styles['create']}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAlbumModal;
