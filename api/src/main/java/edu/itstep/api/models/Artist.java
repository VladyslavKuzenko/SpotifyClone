package edu.itstep.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "artists")
public class Artist {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @OneToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;
    @Column(name="profile_bg_url")
    private String profileBgUrl;
    @Column(name="profile_quote")
    private String profileQuote;
    @Column(name="listening_count")
    private Long listeningCount;

    public Artist() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getProfileBgUrl() {
        return profileBgUrl;
    }

    public void setProfileBgUrl(String profileBgUrl) {
        this.profileBgUrl = profileBgUrl;
    }

    public String getProfileQuote() {
        return profileQuote;
    }

    public void setProfileQuote(String profileQuote) {
        this.profileQuote = profileQuote;
    }

    public Long getListeningCount() {return listeningCount;}

    public void setListeningCount(Long listeningCount) {this.listeningCount = listeningCount;}

}
