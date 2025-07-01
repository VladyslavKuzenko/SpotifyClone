package edu.itstep.api.services;

import edu.itstep.api.models.Playlist;
import edu.itstep.api.models.Track;
import edu.itstep.api.repositories.PlaylistRepository;
import edu.itstep.api.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {
    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private TrackRepository trackRepository;

    public void addTrackToPlaylist(Long playlistId, Long trackId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist not found"));
        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        playlist.getTracks().add(track);
        track.getPlaylists().add(playlist);

        playlistRepository.save(playlist);
        trackRepository.save(track);
    }

    public void removeTrackFromPlaylist(Long playlistId, Long trackId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist not found"));
        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        playlist.getTracks().remove(track);
        track.getPlaylists().remove(playlist);

        playlistRepository.save(playlist);
        trackRepository.save(track);
    }
}
