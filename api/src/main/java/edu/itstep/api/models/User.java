package edu.itstep.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String id;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String username;
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
    @ManyToMany
    @JoinTable(
            name = "users_genres",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    @JsonIgnore
    private Set<Genre> genres;
    @Column(name = "short_bio")
    private String shortBio;
    @Column(name = "followings_count")
    private int followingsCount;
    @Column(name = "followers_count")
    private int followersCount;
    @ManyToOne
    @JoinColumn(name = "day_track_id")
    private Track dayTrack;
    @Column(name = "show_listening_history")
    private boolean showListeningHistory;
    @Column(name = "allow_messages")
    private boolean allowMessages;
    @Column(name = "is_artist")
    private Boolean isArtist;
    @Column(name = "avatar_img_url")
    private String avatarImgUrl;
    @ManyToMany
    @JoinTable(
            name = "users_followings",
            joinColumns = @JoinColumn(name = "follower_user_id"),
            inverseJoinColumns = @JoinColumn(name = "followed_user_id"))
    @JsonIgnore
    private Set<User> followings;
    @ManyToMany(mappedBy = "followings")
    @JsonIgnore
    private Set<User> followers;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_chats",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chat_id"))
    @JsonIgnore
    private Set<Chat> chats;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<TracksListenings> tracksListenings;
    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "likes",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "posts_id"))
    private Set<Post> likedPosts;
    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "likes_story",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "posts_id"))
    private Set<Story> likedStory;
    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "saved_albums",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "albums_id"))
    private Set<Album> savedAlbums;

    public User() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public String getShortBio() {
        return shortBio;
    }

    public void setShortBio(String shortBio) {
        this.shortBio = shortBio;
    }

    public int getFollowingsCount() {
        return followingsCount;
    }

    public void setFollowingsCount(int followingsCount) {
        this.followingsCount = followingsCount;
    }

    public int getFollowersCount() {
        return followersCount;
    }

    public void setFollowersCount(int followersCount) {
        this.followersCount = followersCount;
    }

    public Track getDayTrack() {
        return dayTrack;
    }

    public void setDayTrack(Track dayTrack) {
        this.dayTrack = dayTrack;
    }

    public boolean isShowListeningHistory() {
        return showListeningHistory;
    }

    public void setShowListeningHistory(boolean showListeningHistory) {
        this.showListeningHistory = showListeningHistory;
    }

    public boolean isAllowMessages() {
        return allowMessages;
    }

    public void setAllowMessages(boolean allowMessages) {
        this.allowMessages = allowMessages;
    }

    public Boolean getIsArtist() {
        return isArtist;
    }

    public void setIsArtist(Boolean artist) {
        isArtist = artist;
    }

    public String getAvatarImgUrl() {
        return avatarImgUrl;
    }

    public void setAvatarImgUrl(String avatarImgUrl) {
        this.avatarImgUrl = avatarImgUrl;
    }

    public Set<User> getFollowings() {
        return followings;
    }

    public void setFollowings(Set<User> followings) {
        this.followings = followings;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public Set<Chat> getChats() {
        return chats;
    }

    public void setChats(Set<Chat> chats) {
        this.chats = chats;
    }

    public Set<TracksListenings> getTracksListenings() {
        return tracksListenings;
    }

    public void setTracksListenings(Set<TracksListenings> tracksListenings) {
        this.tracksListenings = tracksListenings;
    }

    public Set<Post> getLikedPosts() {
        return likedPosts;
    }

    public void setLikedPosts(Set<Post> likedPosts) {
        this.likedPosts = likedPosts;
    }

    public Set<Story> getLikedStory() {
        return likedStory;
    }

    public void setLikedStory(Set<Story> likedStory) {
        this.likedStory = likedStory;
    }

    public Set<Album> getSavedAlbums() {
        return savedAlbums;
    }

    public void setSavedAlbums(Set<Album> savedAlbums) {
        this.savedAlbums = savedAlbums;
    }
}