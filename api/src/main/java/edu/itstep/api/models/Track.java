package edu.itstep.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "tracks")
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "artist_id")
    private Artist artist;
    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;
    @Column(nullable = false)
    private String title;
    @Column(name = "genre")
    private String genre;
    @Column(name = "source_url")
    private String sourceUrl;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "listening_count")
    private Long listeningCount;
    @Column(name = "created_at")
    private Instant createdAt;
    @ManyToMany
    @JoinTable(
            name = "tracks_playlists",
            joinColumns = @JoinColumn(name = "track_id"),
            inverseJoinColumns = @JoinColumn(name = "playlist_id"))
    @JsonIgnore
    private Set<Playlist> playlists;


    public Track() {
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

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
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

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getListeningCount() {
        return listeningCount;
    }

    public void setListeningCount(Long listeningCount) {
        this.listeningCount = listeningCount;
    }

    public Instant  getCreatedAt() {return createdAt;}

    public void setCreatedAt(Instant  createdAt) {this.createdAt = createdAt;}

    public Set<Playlist> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(Set<Playlist> playlists) {
        this.playlists = playlists;
    }
}

