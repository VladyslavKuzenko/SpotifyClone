package edu.itstep.api.models;

import edu.itstep.api.models.idClasses.TracksListeningsId;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "tracks_listenings")
public class TracksListenings {
    @EmbeddedId
    private TracksListeningsId id = new TracksListeningsId();
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @MapsId("trackId")
    @JoinColumn(name = "track_id")
    private Track track;
    @Column(name = "listened_datetime")
    private Instant listenedDatetime;

    public TracksListenings() {
    }

    public TracksListeningsId getId() {
        return id;
    }

    public void setId(TracksListeningsId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Track getTrack() {
        return track;
    }

    public void setTrack(Track track) {
        this.track = track;
    }

    public Instant getListenedDatetime() {
        return listenedDatetime;
    }

    public void setListenedDatetime(Instant listenedDatetime) {
        this.listenedDatetime = listenedDatetime;
    }
}
