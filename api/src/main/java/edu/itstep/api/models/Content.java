package edu.itstep.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;

}
