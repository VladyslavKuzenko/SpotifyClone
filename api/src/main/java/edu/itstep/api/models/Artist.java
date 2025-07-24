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
    @Column(name="about_artist")
    private String aboutArtist;
    @Column(name="facebook_link")
    private String facebookLink;
    @Column(name="instagram_link")
    private String instagramLink;
    @Column(name="twitter_link")
    private String twitterLink;
    @Column(name="about_img")
    private String aboutImgUrl;


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

    public String getAboutArtist() {
        return aboutArtist;
    }

    public void setAboutArtist(String aboutArtist) {
        this.aboutArtist = aboutArtist;
    }

    public String getFacebookLink() {
        return facebookLink;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getInstagramLink() {
        return instagramLink;
    }

    public void setInstagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
    }

    public String getTwitterLink() {
        return twitterLink;
    }

    public void setTwitterLink(String twitterLink) {
        this.twitterLink = twitterLink;
    }

    public String getAboutImgUrl() {
        return aboutImgUrl;
    }

    public void setAboutImgUrl(String aboutImgUrl) {
        this.aboutImgUrl = aboutImgUrl;
    }
}
