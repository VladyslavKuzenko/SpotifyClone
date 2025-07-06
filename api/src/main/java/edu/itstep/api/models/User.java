package edu.itstep.api.models;


import com.fasterxml.jackson.annotation.JsonProperty;

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
    @ManyToOne
    @JoinColumn(name = "goal_id")
    private Goal goal;
    @ManyToMany
    @JoinTable(
            name = "users_genres",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    @JsonIgnore
    private Set<Genre> genres;
    @ManyToMany
    @JoinTable(
            name = "users_vibes",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "vibe_id"))
    @JsonIgnore
    private Set<Vibe> vibes;
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
    @Column(name = "ui_theme")
    private String uiTheme;
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
    @ManyToMany
    @JoinTable(
            name = "users_chats",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chat_id"))
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

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public Set<Vibe> getVibes() {
        return vibes;
    }

    public void setVibes(Set<Vibe> vibes) {
        this.vibes = vibes;
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

    public String getUiTheme() {
        return uiTheme;
    }

    public void setUiTheme(String uiTheme) {
        this.uiTheme = uiTheme;
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

    public Track getDayTrack() {
        return dayTrack;
    }

    public void setDayTrack(Track dayTrack) {
        this.dayTrack = dayTrack;
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
}
