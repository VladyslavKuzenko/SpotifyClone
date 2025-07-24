package edu.itstep.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "albums")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "artist_id")
    private Artist artist;
    @Column(nullable = false)
    private String title;
    @Column(name = "genre")
    private String genre;
    @Column(name = "image_url")
    private String imageUrl;
    @OneToMany(mappedBy = "album")
    @JsonIgnore
    private Set<Track> tracks;
    @ManyToMany(mappedBy = "savedAlbums")
    @JsonIgnore
    private Set<User> savedBy;

    public Album() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Set<Track> getTracks() {
        return tracks;
    }

    public void setTracks(Set<Track> tracks) {
        this.tracks = tracks;
    }

    public Set<User> getSavedBy() {
        return savedBy;
    }

    public void setSavedBy(Set<User> savedBy) {
        this.savedBy = savedBy;
    }
}

