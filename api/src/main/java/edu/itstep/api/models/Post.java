package edu.itstep.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
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
    private String description;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Content> contents = new ArrayList<>();
    @Column(name = "likes_count")
    private int likesCount;
    @Column(name = "views_count")
    private int viewsCount;
    @Column(name = "comments_count")
    private int commentsCount;
    @Column(name = "reposts_count")
    private int repostsCount;
    @Column(name = "created_at")
    private Instant createdAt;
    @Column(name = "is_comments_open")
    private Boolean isCommentsOpen;
    @ManyToMany
    @JoinTable(
            name = "posts_hashtags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "hashtag_id"))
    @JsonIgnore
    private Set<HashTag> hashtags;
    @ManyToMany(mappedBy = "likedPosts")
    @JsonIgnore
    private Set<User> likedBy;


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


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Content> getContents() {
        return contents;
    }

    public void setContents(List<Content> contents) {
        this.contents = contents;
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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setIsCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getIsCommentsOpen() {
        return isCommentsOpen;
    }

    public void setCommentsOpen(Boolean commentsOpen) {
        isCommentsOpen = commentsOpen;
    }

    public Set<HashTag> getHashtags() {
        return hashtags;
    }

    public void setHashtags(Set<HashTag> hashtags) {
        this.hashtags = hashtags;
    }

    public Set<User> getLikedBy() {
        return likedBy;
    }

    public void setLikedBy(Set<User> likedBy) {
        this.likedBy = likedBy;
    }

}

