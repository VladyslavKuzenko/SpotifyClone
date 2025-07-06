package edu.itstep.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.itstep.api.models.contentModels.ContentType;
import jakarta.persistence.*;

@Entity
@Table(name = "content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "media_type", nullable = false)
    private ContentType mediaType;
    @Column(name = "media_url", nullable = false)
    private String mediaUrl;
    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonIgnore
    private Post post;

    public Content() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
