package edu.itstep.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.itstep.api.models.contentModels.ContentType;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "stories")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "media_type", nullable = false)
    private ContentType mediaType;
    @Column(name = "media_url", nullable = false)
    private String mediaUrl;
    @Column(name = "likes_count")
    private int likesCount;
    @Column(name = "views_count")
    private int viewsCount;


    public Story() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ContentType getMediaType() {
        return mediaType;
    }

    public void setMediaType(ContentType mediaType) {
        this.mediaType = mediaType;
    }

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public int getViewsCount() {
        return viewsCount;
    }

    public void setViewsCount(int viewsCount) {
        this.viewsCount = viewsCount;
    }
}

