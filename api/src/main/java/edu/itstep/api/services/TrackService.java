package edu.itstep.api.services;

import edu.itstep.api.models.Track;
import edu.itstep.api.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TrackService {
    @Autowired
    private TrackRepository trackRepository;


    public Track updateTrack(Long id, Track updatedTrack) {
        Track track = trackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        track.setImageUrl(updatedTrack.getImageUrl());
        track.setSourceUrl(updatedTrack.getSourceUrl());

        return trackRepository.save(track); // це оновлення
    }

}
