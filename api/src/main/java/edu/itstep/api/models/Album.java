package edu.itstep.api.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "tracks")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "artist_id")
    private Artist artist;
    @Column(nullable = false)
    private String title;
    @OneToMany(mappedBy = "album")
    private Set<Track> tracks;

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

    public Set<Track> getTracks() {
        return tracks;
    }

    public void setTracks(Set<Track> tracks) {
        this.tracks = tracks;
    }
}

