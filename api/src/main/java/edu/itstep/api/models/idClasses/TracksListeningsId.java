package edu.itstep.api.models.idClasses;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TracksListeningsId implements Serializable {
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "track_id")
    private Long trackId;

    public TracksListeningsId() {
    }

    public TracksListeningsId(Long userId, Long trackId) {
        this.userId = userId;
        this.trackId = trackId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
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
