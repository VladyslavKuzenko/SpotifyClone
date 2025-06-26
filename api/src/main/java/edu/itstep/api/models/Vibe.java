package edu.itstep.api.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "vibes")
public class Vibe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;

    public Vibe() {
    }

    public Vibe(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
