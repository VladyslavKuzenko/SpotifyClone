package edu.itstep.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.itstep.api.models.contentModels.ContentType;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(nullable = false)
    private String title;
    private String description;
    @Column(name = "media_type", nullable = false)
    private ContentType mediaType;
    @Column(name = "media_json", nullable = false)
    private String mediaJson;
    @Column(name = "likes_count")
    private int likesCount;
    @Column(name = "views_count")
    private int viewsCount;
    @Column(name = "comments_count")
    private int commentsCount;
    @Column(name = "reposts_count")
    private int repostsCount;
    @ManyToMany
    @JoinTable(
            name = "posts_hashtags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "hashtag_id"))
    @JsonIgnore
    private Set<HashTag> hashtags;

    public Post() {
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ContentType getMediaType() {
        return mediaType;
    }

    public void setMediaType(ContentType mediaType) {
        this.mediaType = mediaType;
    }

    public String getMediaJson() {
        return mediaJson;
    }

    public void setMediaJson(String mediaJson) {
        this.mediaJson = mediaJson;
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

    public int getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }

    public int getRepostsCount() {
        return repostsCount;
    }

    public void setRepostsCount(int repostsCount) {
        this.repostsCount = repostsCount;
    }

    public Set<HashTag> getHashtags() {
        return hashtags;
    }

    public void setHashtags(Set<HashTag> hashtags) {
        this.hashtags = hashtags;
    }
}

