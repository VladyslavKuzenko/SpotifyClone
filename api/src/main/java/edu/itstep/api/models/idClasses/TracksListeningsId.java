package edu.itstep.api.models.idClasses;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TracksListeningsId implements Serializable {
    @Column(name = "user_id")
    private String userId;
    @Column(name = "track_id")
    private Long trackId;

    public TracksListeningsId() {
    }

    public TracksListeningsId(String userId, Long trackId) {
        this.userId = userId;
        this.trackId = trackId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getTrackId() {
        return trackId;
    }

    public void setTrackId(Long trackId) {
        this.trackId = trackId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TracksListeningsId that = (TracksListeningsId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(trackId, that.trackId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, trackId);
    }
}
