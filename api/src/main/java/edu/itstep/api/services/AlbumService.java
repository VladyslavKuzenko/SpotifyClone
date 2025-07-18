package edu.itstep.api.services;

import edu.itstep.api.models.Album;
import edu.itstep.api.models.Track;
import edu.itstep.api.repositories.AlbumRepository;
import edu.itstep.api.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlbumService {
    @Autowired
    private AlbumRepository albumRepository;

    public Album updateAlbum(Long id, Album updatedAlbum) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album not found"));

        album.setTracks(updatedAlbum.getTracks());
        album.setImageUrl(updatedAlbum.getImageUrl());

        return albumRepository.save(album); // це оновлення
    }

}
